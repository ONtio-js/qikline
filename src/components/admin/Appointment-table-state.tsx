import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
const AppointmentTableState = ({title, description, buttonText}: {title: string, description: string, buttonText: string}) => {
	return (
		<div className='flex flex-col gap-y-4 items-center justify-center h-[500px] w-full'>
            <div className='flex flex-col gap-y-4 items-center justify-center bg-blue-200/10 rounded-full h-64 w-64'>
			<Image src='/admin/icons/notification.svg' alt='user' width={200} height={100} />
            </div>
			<h3 className='text-2xl font-semibold capitalize text-gray-800'>
				{title}
			</h3>
			<p className='text-gray-500 text-center max-w-[500px]'>
				{description}
			</p>
            <Button className='bg-blue-800 text-white hover:bg-blue-700 w-xs h-12 font-medium'>{buttonText}</Button>
		</div>
	);
};

export default AppointmentTableState;