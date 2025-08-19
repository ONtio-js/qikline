import { create } from 'zustand';
import { createBusiness, getBusiness } from '@/actions/admin/businessMgt/route';
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
	banner?: Array<{ id: string; image: string }>;
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
	created_at?: string;
	updated_at?: string;
}

interface BusinessStore {
	businessData: BusinessData | null;
	isLoading: boolean;
	error: string | null;
	isInitialized: boolean;

	fetchBusinessData: () => Promise<void>;
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

	fetchBusinessData: async () => {
		const { setLoading, setError, setBusinessData } = get();

		console.log('BusinessStore: Starting to fetch business data');
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
					console.log(
						'BusinessStore: Business data fetched successfully',
						businessData
					);
					setBusinessData(businessData);
				} else {
					console.log(
						'BusinessStore: No business data found - user may need to create a business profile'
					);
					// Don't set an error for this case - it's normal for new users
					setBusinessData(null);
				}
				set({ isInitialized: true });
			} else {
				console.log(
					'BusinessStore: Failed to fetch business data',
					response
				);
				// If status is false, it means no business was found or there was an error
				// For new users, this is normal - they need to create a business profile
				console.log(
					'BusinessStore: No business profile found - user needs to create one'
				);
				setBusinessData(null);
				set({ isInitialized: true });
			}
		} catch (error) {
			console.error('BusinessStore: Error fetching business data', error);
			// For any error, assume the user needs to create a business profile
			// This is the safest approach for new users
			console.log(
				'BusinessStore: Error occurred - user may need to create a business profile'
			);
			setBusinessData(null);
			setError(null); // Don't show error for this case
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
