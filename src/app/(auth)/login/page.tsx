import Login from '@/components/forms/Login';
import React, { Suspense } from 'react';

const page = () => {
	return (
		<div className='w-[80%] mx-auto'>
			<Suspense fallback={<div>Loading...</div>}>
				<Login />
			</Suspense>
		</div>
	);
};

export default page;
