import Login from '@/components/forms/Login';
import React, { Suspense } from 'react';

const page = () => {
	return (
		<div className='md:w-[80%] w-full mx-auto'>
			<Suspense fallback={<div>Loading...</div>}>
				<Login />
			</Suspense>
		</div>
	);
};

export default page;
