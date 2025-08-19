'use client';

import { useEffect } from 'react';
import { removeTokens } from '@/utils/token';

export default function LogoutPage() {
	useEffect(() => {
		removeTokens();
		window.location.href = '/login';
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
