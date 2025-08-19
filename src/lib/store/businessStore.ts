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

	// Actions
	fetchBusinessData: () => Promise<void>;
	setBusinessData: (data: BusinessData) => void;
	updateBusiness: (updates: Partial<BusinessData>) => void;
	clearBusinessData: () => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
}

export const useBusinessStore = create<BusinessStore>((set, get) => ({
	businessData: null,
	isLoading: false,
	error: null,
	isInitialized: false,

	fetchBusinessData: async () => {
		const { setLoading, setError, setBusinessData } = get();

		setLoading(true);
		setError(null);

		try {
			const token = getAccessToken();
			if (!token) {
				setError('No access token available');
				setLoading(false);
				set({ isInitialized: true }); // Mark as initialized to prevent infinite loops
				return;
			}

			const response = await getBusiness();

			if (response.status) {
				// Assuming the API returns an array, we'll take the first business
				// or you might need to adjust this based on your API response
				const businessData = Array.isArray(response.data)
					? response.data[0]
					: response.data;
				setBusinessData(businessData);
				set({ isInitialized: true });
			} else {
				setError('Failed to fetch business data');
				set({ isInitialized: true }); // Mark as initialized to prevent infinite loops
			}
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: 'An error occurred while fetching business data'
			);
			set({ isInitialized: true }); // Mark as initialized to prevent infinite loops
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
	setBusinessData: (data: BusinessData) => {
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
