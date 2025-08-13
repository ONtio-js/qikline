'use client';

import React, { useEffect } from 'react';
import { useBusinessStore } from '@/lib/store';

interface BusinessProviderProps {
	children: React.ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({
	children,
}) => {
	const { fetchBusinessData, isInitialized } = useBusinessStore();

	useEffect(() => {
		// Initialize business data when the provider mounts
		if (!isInitialized) {
			fetchBusinessData();
		}
	}, [isInitialized, fetchBusinessData]);

	return <>{children}</>;
};
