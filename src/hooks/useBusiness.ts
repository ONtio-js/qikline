'use client';
import { useEffect } from 'react';
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

	// Auto-fetch business data if not initialized
	useEffect(() => {
		if (!isInitialized) {
			fetchBusinessData();
		}
	}, [isInitialized, fetchBusinessData]);

	return {
		// State
		businessData,
		isLoading,
		error,
		isInitialized,

		// Actions
		fetchBusinessData,
		setBusinessData,
		updateBusiness,
		clearBusinessData,
		setLoading,
		setError,

		// Computed values
		hasBusiness: !!businessData,
		primaryBusiness: businessData || null,
	};
};
