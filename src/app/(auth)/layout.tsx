'use client';
import React from 'react';
import Layoutomponent from '../../components/onboarding/Layoutomponent';
import { useMediaQuery } from '@/hooks/use-media-query';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const isMobile = useMediaQuery('(max-width: 768px)');
	return (
		<div className='flex  min-h-screen w-screen'>
			<div className={`w-1/2  p-10  my-auto ${isMobile ? 'w-full' : ''}`}>
				{children}
			</div>
			<Layoutomponent />
		</div>
	);
};

export default Layout;
