import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	getAccessToken,
	getRefreshToken,
	setTokens,
	removeTokens,
} from '@/utils/token';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://qikline-backend.onrender.com/api/v1';

interface RefreshTokenResponse {
	access_token: string;
	refresh_token: string;
}

interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

interface QueueItem {
	resolve: (value: unknown) => void;
	reject: (error: unknown) => void;
}

class ApiWrapper {
	private static instance: ApiWrapper;
	private axiosInstance: AxiosInstance;
	private isRefreshing = false;
	private failedQueue: Array<QueueItem> = [];

	private constructor() {
		this.axiosInstance = axios.create({
			baseURL: API_URL,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		this.setupInterceptors();
	}

	public static getInstance(): ApiWrapper {
		if (!ApiWrapper.instance) {
			ApiWrapper.instance = new ApiWrapper();
		}
		return ApiWrapper.instance;
	}

	private setupInterceptors() {
		// Request interceptor
		this.axiosInstance.interceptors.request.use(
			(config) => {
				const token = getAccessToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		// Response interceptor
		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => response,
			async (error) => {
				const originalRequest = error.config;

				if (error.response?.status === 401 && !originalRequest._retry) {
					if (this.isRefreshing) {
						// If already refreshing, add to queue
						return new Promise((resolve, reject) => {
							this.failedQueue.push({ resolve, reject });
						})
							.then(() => {
								return this.axiosInstance(originalRequest);
							})
							.catch((err) => {
								return Promise.reject(err);
							});
					}

					originalRequest._retry = true;
					this.isRefreshing = true;

					try {
						const refreshToken = getRefreshToken();
						if (!refreshToken) {
							throw new Error('No refresh token available');
						}

						const response = await this.refreshToken(refreshToken);
						const { access_token, refresh_token } = response;
						setTokens(access_token, refresh_token);

						// Update the original request with new token
						originalRequest.headers.Authorization = `Bearer ${access_token}`;

						// Process queued requests
						this.processQueue(null, access_token);

						return this.axiosInstance(originalRequest);
					} catch (refreshError) {
						this.processQueue(refreshError, null);
						this.logout();
						return Promise.reject(refreshError);
					} finally {
						this.isRefreshing = false;
					}
				}

				return Promise.reject(error);
			}
		);
	}

	private processQueue(error: unknown, token: string | null) {
		this.failedQueue.forEach(({ resolve, reject }) => {
			if (error) {
				reject(error);
			} else {
				resolve(token);
			}
		});
		this.failedQueue = [];
	}

	private async refreshToken(
		refreshToken: string
	): Promise<RefreshTokenResponse> {
		try {
			const response = await axios.post(`${API_URL}/auth/refresh-token`, {
				refresh: refreshToken,
			});
			return response.data;
		} catch {
			throw new Error('Failed to refresh token');
		}
	}

	private logout() {
		removeTokens();
		// You can add additional logout logic here, like redirecting to login page
		if (typeof window !== 'undefined') {
			window.location.href = '/login';
		}
	}

	// Public methods for making requests
	public async get<T = unknown>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.get(url, config);
			return {
				success: true,
				data: response.data,
			};
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { data?: { message?: string } };
				message?: string;
			};
			return {
				success: false,
				error:
					axiosError.response?.data?.message ||
					axiosError.message ||
					'Request failed',
			};
		}
	}

	public async post<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.post(url, data, config);
			return {
				success: true,
				data: response.data,
			};
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { data?: { message?: string } };
				message?: string;
			};
			return {
				success: false,
				error:
					axiosError.response?.data?.message ||
					axiosError.message ||
					'Request failed',
			};
		}
	}

	public async put<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.put(url, data, config);
			return {
				success: true,
				data: response.data,
			};
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { data?: { message?: string } };
				message?: string;
			};
			return {
				success: false,
				error:
					axiosError.response?.data?.message ||
					axiosError.message ||
					'Request failed',
			};
		}
	}

	public async patch<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.patch(url, data, config);
			return {
				success: true,
				data: response.data,
			};
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { data?: { message?: string } };
				message?: string;
			};
			return {
				success: false,
				error:
					axiosError.response?.data?.message ||
					axiosError.message ||
					'Request failed',
			};
		}
	}

	public async delete<T = unknown>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.delete(url, config);

			return {
				success: true,
				data: response.data,
			};
		} catch (error: unknown) {
			const axiosError = error as {
				response?: { data?: { message?: string } };
				message?: string;
			};
			return {
				success: false,
				error:
					axiosError.response?.data?.message ||
					axiosError.message ||
					'Request failed',
			};
		}
	}

	// Method to check if user is authenticated
	public isAuthenticated(): boolean {
		return !!getAccessToken();
	}

	// Method to get current tokens
	public getTokens() {
		return {
			accessToken: getAccessToken(),
			refreshToken: getRefreshToken(),
		};
	}

	// Method to manually set tokens (useful after login)
	public setTokens(accessToken: string, refreshToken: string) {
		setTokens(accessToken, refreshToken);
	}

	// Method to clear tokens (useful for logout)
	public clearTokens() {
		removeTokens();
	}
}

// Export a singleton instance
export const apiWrapper = ApiWrapper.getInstance();

// Export the class for testing purposes
export { ApiWrapper };
