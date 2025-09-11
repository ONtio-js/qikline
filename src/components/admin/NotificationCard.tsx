'use client';
import { Bell, Calendar, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import NotificationViewCard from './NotificationViewCard';
import {
	DeleteNotification,
	MarkReadNotification,
} from '@/actions/admin/notifications/route';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type NotificationCardProps = {
	title: string;
	message: string;
	email?: string;
	type: 'BOOKINGS' | 'PAYMENTS' | 'SYSTEM';
	createdAt: string;
	read: boolean;
	id: string;
};
const NotificationCard = ({
	title,
	message,
	email,
	type,
	createdAt,
	read,
	id,
}: NotificationCardProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const handleDelete = async () => {
		const response = await DeleteNotification(id);
		if (response.status) {
			toast.success(response.message, {
				position: 'top-right',
			});
			router.refresh();
		}
	};
	const handleMarkRead = async () => {
		const response = await MarkReadNotification(id);
		if (response.status) {
			toast.success(response.message);
			router.refresh();
		}
	};
	return (
		<>
			<div
				onClick={() => setIsOpen(true)}
				key={id}
				className='hover:bg-gray-50 p-8 px-4 rounded-lg  space-y-4 border border-gray-200 flex items-start justify-between max-w-4xl'
			>
				<div className='flex items-start gap-x-4'>
					<div>
						{type === 'BOOKINGS' && (
							<Calendar className='w-5 h-5 text-blue-500' />
						)}
						{type === 'PAYMENTS' && (
							<Image
								src={'/credit-card.svg'}
								width={30}
								height={30}
								alt='credit-card'
								className='text-blue-500'
							/>
						)}
						{type === 'SYSTEM' && (
							<Bell className='w-5 h-5 text-gray-800' />
						)}
					</div>
					<div className='flex flex-col gap-y-2 w-full'>
						<h5 className='text-lg font-medium text-gray-800'>
							{title}
						</h5>
						<p className='text-gray-500 text-sm  w-[80%]'>
							{message}
						</p>
						{email && (
							<p className='text-gray-500 text-sm'>{email}</p>
						)}
						<p className='text-gray-500 text-sm'>{createdAt}</p>
						<p
							className={`text-gray-500 text-sm w-fit ${
								read
									? 'text-green-500 bg-green-500/10 px-2 py-1 rounded-md'
									: 'text-red-500 bg-red-500/10 px-2 py-1 rounded-md'
							}`}
						>
							{read ? 'Read' : 'Unread'}
						</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className='bg-gray text-gray-800   rounded-full flex items-center justify-center  hover:bg-gray-200 cursor-pointer border border-gray-200 group '>
						<MoreHorizontal
							size={24}
							className='text-gray-700  group-hover:text-gray-800'
						/>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</div>

			<NotificationViewCard
				title={title}
				message={message}
				email={email}
				type={type}
				createdAt={createdAt}
				read={read}
				id={id}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				handleDelete={handleDelete}
				handleMarkRead={handleMarkRead}
			/>
		</>
	);
};
export default NotificationCard;
