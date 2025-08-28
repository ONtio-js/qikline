'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth';
import { getAccessToken, removeTokens } from '@/utils/token';

interface AuthGuardProps {
	children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const checkAuth = useCallback(async () => {
	

		try {
			
			const authenticated = authService.isAuthenticated();

			
			const accessToken = getAccessToken();
			const isValidToken = accessToken && accessToken.length > 20; 

			console.log('AuthGuard: Authentication result:', {
				authenticated,
				hasToken: !!accessToken,
				tokenLength: accessToken?.length,
				isValidToken,
				timestamp: new Date().toISOString(),
			});

			if (!authenticated || !isValidToken) {
				console.log(
					'AuthGuard: Not authenticated or invalid token, redirecting to login'
				);
				
				removeTokens();
				
				router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
				return;
			}

			setIsAuthenticated(true);
		} catch (error) {
			console.error('Auth check failed:', error);
			router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
		} finally {
			setIsLoading(false);
		}
	}, [pathname, router]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-white/20'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700'></div>
			</div>
		);
	}

	return isAuthenticated ? <>{children}</> : null;
}
