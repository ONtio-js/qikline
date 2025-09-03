'use client';
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { usePathname } from 'next/navigation';

const Layoutomponent = () => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const pathname = usePathname();

	const isLogin = pathname.includes('login');
	return (
		<div
			className={`w-1/2 bg-gray-100 ${isLogin ? 'bg-[url("/onboarding/auth.jpg")]' : 'bg-[url("/onboarding/auth-bg.jpg")]'} bg-cover bg-center flex flex-col items-end justify-end ${
				isMobile ? 'hidden' : ''
			}`}
		>
			<div className='w-full h-[200px] bg-black/10 backdrop-blur-[10px] p-10  flex flex-col gap-2'>
				<h2 className='text-white text-4xl font-bold'>
					{isLogin ? 'Welcome Back to QikLine' : 'Put your business in control'}
				</h2>
				<p className='text-white text-lg font-medium '>
					{isLogin
						? "let's keep thing moving"
						: 'Easily manage appointments, staff, and queues from one smart dashboard.'}
				</p>
			</div>
		</div>
	);
};

export default Layoutomponent;
