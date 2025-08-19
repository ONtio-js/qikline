'use client';
import { useBusinessStore } from '@/lib/store';

export const useBusiness = () => {
	const {
		businessData,
		isLoading,
		error,
		isInitialized,
		fetchBusinessData,
		setBusinessData,
		updateBusiness,
		clearBusinessData,
		setLoading,
		setError,
	} = useBusinessStore();

	return {
		businessData,
		isLoading,
		error,
		isInitialized,
		fetchBusinessData,
		setBusinessData,
		updateBusiness,
		clearBusinessData,
		setLoading,
		setError,
		hasBusiness: !!businessData,
		primaryBusiness: businessData || null,
	};
};
