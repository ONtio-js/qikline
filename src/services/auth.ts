'use client';
import axios from 'axios';
import {
	getAccessToken,
	getRefreshToken,
	setTokens,
	removeTokens,
} from '@/utils/token';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://qikline-backend.onrender.com/api/v1';

interface LoginResponse {
	status: boolean;
	message?: string;
	error?: string;
	data?: {
		access_token: string;
		refresh_token: string;
	};
}

interface RefreshTokenResponse {
	access_token: string;
	refresh_token: string;
}

class AuthService {
	private static instance: AuthService;
	private axiosInstance;

	private constructor() {
		this.axiosInstance = axios.create({
			baseURL: API_URL,
		});

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
			(response) => response,
			async (error) => {
				const originalRequest = error.config;

				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					try {
						const refreshToken = getRefreshToken();
						if (!refreshToken) {
							throw new Error('No refresh token available');
						}

						const response = await this.refreshToken(refreshToken);
						const { access_token, refresh_token } = response;
						setTokens(access_token, refresh_token);

						originalRequest.headers.Authorization = `Bearer ${access_token}`;
						return this.axiosInstance(originalRequest);
					} catch (refreshError) {
						this.logout();
						return Promise.reject(refreshError);
					}
				}

				return Promise.reject(error);
			}
		);
	}

	public static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	async login(email: string, password: string): Promise<LoginResponse> {
		try {
			console.log('AuthService: Making login request...');
			const response = await this.axiosInstance.post(
				'/business-owners/login/',
				{
					email,
					password,
				}
			);

			if (response.data.success) {
				setTokens(
					response.data.data.access,
					response.data.data.refresh
				);

				return {
					status: true,
					message: 'Login successful',
					data: {
						access_token: response.data.data.access,
						refresh_token: response.data.data.refresh,
					},
				};
			} else {
				return {
					status: false,
					message: 'Invalid response from server',
				};
			}
		} catch (error: unknown) {
			console.log(
				'AuthService: Login error:',
				error instanceof Error ? error.message : error
			);
			const axiosError = error as {
				response?: {
					data?: { errors?: { non_field_errors?: string[] } };
				};
			};
			return {
				status: false,
				message:
					axiosError.response?.data?.errors?.non_field_errors?.[0] ||
					'Login failed',
			};
		}
	}

	async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
		try {
			const response = await this.axiosInstance.post(
				'/business-owners/refresh-token',
				{
					refresh_token: refreshToken,
				}
			);
			return response.data;
		} catch {
			throw new Error('Failed to refresh token');
		}
	}

	logout() {
		console.log('AuthService: Logout initiated...');
		removeTokens();

		// Clear business store state if available
		if (typeof window !== 'undefined') {
			try {
				// Import and clear business store
				import('@/lib/store/businessStore')
					.then(({ useBusinessStore }) => {
						useBusinessStore.getState().clearBusinessData();
						console.log('AuthService: Business store cleared');
					})
					.catch(() => {
						console.log(
							'AuthService: Business store not available'
						);
					});
			} catch (error) {
				console.log(
					'AuthService: Error clearing business store:',
					error
				);
			}
		}

		if (typeof window !== 'undefined') {
			console.log('AuthService: Redirecting to login page...');
			window.location.href = '/login';
		}
	}

	isAuthenticated(): boolean {
		return !!getAccessToken();
	}

	getAuthHeader() {
		const token = getAccessToken();
		return token ? { Authorization: `Bearer ${token}` } : {};
	}

	// Public method to access the axios instance for making authenticated requests
	getAxiosInstance() {
		return this.axiosInstance;
	}
}

export const authService = AuthService.getInstance();
