'use client';

import React, { useEffect, useState } from 'react';
import { useBusinessStore } from '@/lib/store';
import { getAccessToken } from '@/utils/token';
import { authService } from '@/services/auth';

interface BusinessProviderProps {
	children: React.ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({
	children,
}) => {
	const { fetchBusinessData, isInitialized, error } = useBusinessStore();
	const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

	useEffect(() => {
		const checkAuthAndFetch = async () => {
			const token = getAccessToken();
			const isAuthenticated = authService.isAuthenticated();
			if (isAuthenticated && token && !isInitialized && !error) {
				await fetchBusinessData();
			}

			setHasCheckedAuth(true);
		};

		const timer = setTimeout(checkAuthAndFetch, 100);

		return () => clearTimeout(timer);
	}, [isInitialized, error, fetchBusinessData]);

	useEffect(() => {
		const handleStorageChange = () => {
			if (hasCheckedAuth) {
				const token = getAccessToken();
				const isAuthenticated = authService.isAuthenticated();
			
				if (isAuthenticated && token && !isInitialized && !error) {
					fetchBusinessData();
				}
			}
		};

		
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible' && hasCheckedAuth) {
				const token = getAccessToken();
				const isAuthenticated = authService.isAuthenticated();

				if (isAuthenticated && token) {
					fetchBusinessData(true);
				}
			}
		};

		const handleOnline = () => {
			if (hasCheckedAuth) {
				const token = getAccessToken();
				const isAuthenticated = authService.isAuthenticated();

				if (isAuthenticated && token) {
					fetchBusinessData(true);
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);
		document.addEventListener('visibilitychange', handleVisibilityChange);
		window.addEventListener('online', handleOnline);

		const interval = setInterval(() => {
			if (!hasCheckedAuth) {
				handleStorageChange();
			}
		}, 500);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
			window.removeEventListener('online', handleOnline);
			clearInterval(interval);
		};
	}, [hasCheckedAuth, isInitialized, error, fetchBusinessData]);

	return <>{children}</>;
};
