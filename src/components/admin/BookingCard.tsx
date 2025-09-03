import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import {
	CheckCircleIcon,
	CircleCheck,
	MoreVertical,
	Trash,
	XCircleIcon,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { updateBooking } from '@/actions/admin/Booking/route';
import { toast } from 'sonner';

type BookingCardProps = {
	id: number;
	business_name: string;
	customer_email: string;
	date: string;
	time: string;
	status: string;
	status_display: string;
	service: {
		id: number;
		name: string;
		description: string;
		price: string;
		duration: number;
	};
};

const BookingCard = ({
	id,
	business_name,
	customer_email,
	date,
	time,
	service,
	status,
}: BookingCardProps) => {
	const handleUpdateBooking = async (
		id: number,
		data: {
			status: string;
			reason?: string;
		}
	) => {
		const response = await updateBooking(id, data);
		if (response.status) {
			toast.success('Booking Status updated successfully', {
				duration: 3000,
				position: 'top-right',
				className: 'bg-green-500 text-white',
				icon: <CheckCircleIcon className='w-4 h-4' />,
				style: {
					backgroundColor: 'green',
					color: 'white',
				},
			});
		} else {
			toast.error('Error updating booking', {
					duration: 3000,
					position: 'top-right',
					className: 'bg-red-500 text-white',
					icon: <XCircleIcon className='w-4 h-4' />,
					style: {
						backgroundColor: 'red',
						color: 'white',
					},
				}
			);
		}
	};
	return (
		<div className='hover:border-blue-500 transition-all duration-300 flex gap-x-4 p-6 border border-gray-200 rounded-md cursor-pointer hover:shadow-md'>
			<Avatar className='w-10 h-10 rounded-full bg-blue-200/30 text-gray-500 flex items-center justify-center font-bold'>
				<AvatarImage src={''} />
				<AvatarFallback>
					{customer_email?.charAt(0).toUpperCase() || ''}
				</AvatarFallback>
			</Avatar>
			<div className='flex w-[87%] justify-between items-start'>
				<div className='flex flex-col justify-between gap-2'>
					<div className='flex flex-col gap-y-2'>
						<h4 className='text-lg font-medium truncate max-w-[200px]'>
							{customer_email}
						</h4>
						<p className='text-sm text-gray-500 capitalize border border-gray-200 rounded-full px-4 py-1 w-fit'>
							{service?.name || ''}
						</p>
						<p className='text-xs text-gray-400'>{business_name}</p>
					</div>
					<div>
						<p>
							{date} at {time.slice(0, 5)} {time.slice(0, 2) >= '12' ? 'PM' : 'AM'}
						</p>
						<div className='flex items-center gap-x-2'>
							<p>Duration: {service?.duration || 0} mins</p>
							<p className='text-sm font-medium'>
								@ ₦{service?.price}
							</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col justify-between items-center gap-y-2 h-full'>
					<DropdownMenu>
						<DropdownMenuTrigger className='bg-gray-100 h-10 w-10 text-gray-800  rounded-full flex items-center justify-center  hover:bg-gray-200 cursor-pointer border border-gray-200 group '>
							<MoreVertical
								size={24}
								className='text-blue-700 group-hover:text-gray-800'
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='bottom'
							align='end'
						>
							
							<DropdownMenuItem
								className='flex items-center gap-x-2 text-red-500'
								onClick={() =>
									handleUpdateBooking(id, {
										status: 'CANCELLED',
										reason: 'Customer cancelled the booking',
									})
								}
							>
								<Trash
									size={24}
									className='text-red-500'
								/>
								Cancel
							</DropdownMenuItem>
							<DropdownMenuItem
								className='flex items-center gap-x-2 text-green-500'
								onClick={() =>
									handleUpdateBooking(id, {
										status: 'COMPLETED',
									})
								}
							>
								<CircleCheck
									className='text-green-500'
									size={24}
								/>
								Mark Done
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<p className={`text-[10px] md:text-sm text-gray-500 capitalize border  rounded-full px-2 md:px-4 py-1 w-fit ${status === 'COMPLETED' ? 'bg-green-500 text-white' : status === 'CANCELLED' ? 'bg-red-500 text-white' : 'bg-blue-700 text-white'}`}>
						{status}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
