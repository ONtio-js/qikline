import React from 'react';
import { Button } from '../ui/button';
import { Calendar, CircleCheck, Trash, X } from 'lucide-react';
type NotificationCardProps = {
	title: string;
	message: string;
	email?: string;
	id?: string;
	type: 'BOOKINGS' | 'PAYMENTS' | 'SYSTEM';
	createdAt: string;
	read: boolean;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};
const NotificationViewCard = ({
	title,
	message,
	type,
	createdAt,
	read,
	isOpen,
	setIsOpen,
}: NotificationCardProps) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center transition-all duration-500 ${
				isOpen ? 'block' : 'hidden'
			} z-50`}
			onClick={() => setIsOpen(false)}
		>
			<div
				className='bg-white  rounded-lg pb-4 w-[90%] md:w-full  md:max-w-4xl space-y-4 pt-0'
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className='text-2xl px-4 rounded-t-lg font-semibold py-4 bg-blue-700/80 text-white flex items-center gap-x-2 '>
					{title}{' '}
					{type === 'BOOKINGS' && (
						<Calendar className='w-5 h-5 text-white' />
					)}
				</h3>
				<p className='text-gray-500 px-4'>{message}</p>

				<p className='text-gray-500 px-4'>
					Time:{' '}
					<span className='font-semibold text-gray-800'>
						{createdAt.split('T')[0] +
							' ' +
							createdAt.split('T')[1].slice(0, 5)}
					</span>
					<span className='text-gray-800 font-semibold'>
						{' '}
						{createdAt.split('T')[1].slice(0, 2) >= '12'
							? 'PM'
							: 'AM'}
					</span>
				</p>
				<p className='text-gray-500 px-4'>{read}</p>

				<div className='flex items-center gap-x-2 px-4'>
					<Button
						variant='outline'
						onClick={() => setIsOpen(false)}
					>
						Close <X className='w-4 h-4' />
					</Button>
					<Button
						variant='destructive'
						onClick={() => setIsOpen(false)}
					>
						Delete <Trash className='w-4 h-4' />
					</Button>
					<Button
						variant='outline'
						className='bg-green-500 text-white hover:bg-green-600 w-fit border-none'
						onClick={() => setIsOpen(false)}
					>
						Mark Read <CircleCheck className='w-4 h-4' />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotificationViewCard;
