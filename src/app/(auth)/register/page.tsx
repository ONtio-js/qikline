'use client';
import React from 'react';
import AdminSignUp from '@/components/forms/AdminSignUp';

const RegisterPage = () => {
	return (
		<div className='md:min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<AdminSignUp />
			</div>
		</div>
	);
};

export default RegisterPage;
