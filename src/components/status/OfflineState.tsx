'use client';

import { WifiOff } from 'lucide-react';

export default function OfflineState() {
	return (
		<div className='flex flex-col items-center h-full w-full justify-center gap-3 py-10 text-center'>
			<div className='rounded-full bg-gray-100 p-3'>
				<WifiOff className='h-6 w-6 text-gray-500' />
			</div>
			<h3 className='text-base font-semibold'>You are offline</h3>
			<p className='max-w-md text-sm text-gray-500'>
				Please check your internet connection. Some data may be
				unavailable while you are offline.
			</p>
		</div>
	);
}
