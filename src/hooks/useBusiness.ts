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

	// Note: BusinessProvider handles initial data fetching
	// This hook provides access to business data and actions
	// Only fetch if explicitly called or if there's an error and not initialized

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
