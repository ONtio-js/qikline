'use client';

import React, { useEffect } from 'react';
import { useBusinessStore } from '@/lib/store';

interface BusinessProviderProps {
	children: React.ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({
	children,
}) => {
	const { fetchBusinessData, isInitialized, error } = useBusinessStore();

	useEffect(() => {
		// Initialize business data when the provider mounts
		// Only fetch if not initialized and no error exists
		if (!isInitialized && !error) {
			fetchBusinessData();
		}
	}, [isInitialized, error, fetchBusinessData]);

	return <>{children}</>;
};
