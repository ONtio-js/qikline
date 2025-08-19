'use client';

import { useEffect } from 'react';
import { authService } from '@/services/auth';

export default function LogoutPage() {
	useEffect(() => {
		// Perform logout - this will handle the redirect automatically
		authService.logout();
	}, []);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700 mx-auto mb-4'></div>
				<p className='text-gray-600'>Logging out...</p>
			</div>
		</div>
	);
}
