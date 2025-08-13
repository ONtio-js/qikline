'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth';

interface AuthGuardProps {
	children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				// Check if user is authenticated
				const authenticated = authService.isAuthenticated();

				if (!authenticated) {
					// Redirect to login with current path as redirect parameter
					router.push(
						`/login?redirect=${encodeURIComponent(pathname)}`
					);
					return;
				}

				setIsAuthenticated(true);
			} catch (error) {
				console.error('Auth check failed:', error);
				router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, [router, pathname]);

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-white/20'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700'>
					
				</div>
			</div>
		);
	}

	// Only render children if authenticated
	return isAuthenticated ? <>{children}</> : null;
}
