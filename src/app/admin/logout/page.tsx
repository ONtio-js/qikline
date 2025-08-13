'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		// Perform logout
		authService.logout();

		// Redirect to login page
		router.push('/login');
	}, [router]);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700 mx-auto mb-4'></div>
				<p className='text-gray-600'>Logging out...</p>
			</div>
		</div>
	);
}
