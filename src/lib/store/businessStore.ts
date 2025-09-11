import { create } from 'zustand';
import {
	createBusiness,
	getBusiness,
	getBusinessMetrics,
} from '@/actions/admin/businessMgt/route';

import { getAccessToken } from '@/utils/token';

export interface BusinessData {
	id: string;
	name: string;
	category: 'SPA' | 'HAIR_SALON' | 'NAIL_SALON' | 'MASSAGE' | 'OTHER';
	description: string;
	address: string;
	city: string;
	state: string;
	country: string;
	phone_number: string;
	email: string;
	website?: string;
	images?: Array<{ id: string; image: string }>;
	is_active: boolean;
	business_hours?: Array<{
		day_name: string;
		day: string;
		opening_time: string;
		closing_time: string;
		is_closed: boolean;
	}>;
	services?: Array<{
		id: string;
		name: string;
		description: string;
		price: number;
		duration: number;
		category: string;
		category_display: string;
		is_active: boolean;
	}>;
	metrics?: BusinessMetrics;
	created_at?: string;
	updated_at?: string;
}
export type BusinessMetrics = {
	data: {
	total_bookings: number;
		total_revenue: number;
		active_customers: number;
		average_wait_time: number;
	}
};
interface BusinessStore {
	businessData: BusinessData | null;
	isLoading: boolean;
	error: string | null;
	isInitialized: boolean;

	fetchBusinessData: (forceRefresh?: boolean) => Promise<void>;
	setBusinessData: (data: BusinessData | null) => void;
	updateBusiness: (updates: Partial<BusinessData>) => void;
	clearBusinessData: () => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
}

export const useBusinessStore = create<BusinessStore>((set, get) => ({
	businessData: null,
	isLoading: true,
	error: null,
	isInitialized: false,

	fetchBusinessData: async (forceRefresh = false) => {
		const { setLoading, setError, setBusinessData, isInitialized } = get();

		if (isInitialized && !forceRefresh) {
			return;
		}

		console.log('BusinessStore: Starting to fetch business data', {
			forceRefresh,
		});
		setLoading(true);
		setError(null);

		try {
			const token = getAccessToken();
			if (!token) {
				console.log('BusinessStore: No access token available');
				setError('No access token available');
				setLoading(false);
				set({ isInitialized: true });
				return;
			}

			console.log('BusinessStore: Calling getBusiness API');
			const response = await getBusiness();

			if (response.status) {
				const businessData = Array.isArray(response.data)
					? response.data[0]
					: response.data;
				
				if (businessData) {
					

					
					try {
						const metricsResponse = await getBusinessMetrics(
							businessData.id
						);
						if (metricsResponse.status) {
							businessData.metrics =
								metricsResponse.data as BusinessMetrics;
						
						}
					} catch (metricsError) {
						console.warn(
							'BusinessStore: Failed to fetch business metrics',
							metricsError
						);
						
					}

					setBusinessData(businessData);
				} else {
					

					setBusinessData(null);
				}
				set({ isInitialized: true });
			} else {
				console.log(
					'BusinessStore: Failed to fetch business data',
					response
				);

				setBusinessData(null);
				set({ isInitialized: true });
			}
		} catch (error) {
			console.error('BusinessStore: Error fetching business data', error);

			// Check if it's a network error
			if (
				error instanceof Error &&
				(error.message.includes('fetch') ||
					error.message.includes('network') ||
					error.message.includes('Failed to fetch'))
			) {
				console.log(
					'BusinessStore: Network error detected, will retry later'
				);
				setError('Network error - please check your connection');
			} else {
				// For other errors, assume the user needs to create a business profile
				console.log(
					'BusinessStore: Error occurred - user may need to create a business profile'
				);
				setBusinessData(null);
				setError(null); // Don't show error for this case
			}
			set({ isInitialized: true });
		} finally {
			setLoading(false);
		}
	},
	createBusiness: async (data: BusinessData) => {
		const { setLoading, setError, setBusinessData } = get();
		setLoading(true);
		setError(null);
		try {
			const token = getAccessToken();
			if (!token) {
				setError('No access token available');
				setLoading(false);
				return;
			}
			const response = await createBusiness(data);
			if (response.status) {
				setBusinessData(response.data as BusinessData);
				set({ isInitialized: true }); // Mark as initialized after successful creation
			} else {
				setError('Failed to create business data');
			}
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: 'An error occurred while creating business data'
			);
		} finally {
			setLoading(false);
		}
	},
	setBusinessData: (data: BusinessData | null) => {
		set({ businessData: data, error: null });
	},

	updateBusiness: (updates: Partial<BusinessData>) => {
		set((state) => ({
			businessData: state.businessData
				? { ...state.businessData, ...updates }
				: null,
		}));
	},

	clearBusinessData: () => {
		set({ businessData: null, error: null, isInitialized: false });
	},

	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},

	setError: (error: string | null) => {
		set({ error });
	},
}));
