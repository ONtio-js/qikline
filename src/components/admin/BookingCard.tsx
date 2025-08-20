import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
type BookingCardProps = {
	id: string;
	client_name: string;
	client_email: string;
	client_phone: string;
	service_name: string;
	service_duration: number;
	booking_date: string;
	booking_time: string;
	status: string;
};
const BookingCard = ({
	client_name,
	service_name,
	service_duration,
	booking_date,
	booking_time,
	
}: BookingCardProps) => {
	return (
		<div className='hover:border-blue-500 transition-all duration-300 flex gap-x-4 p-6 border border-gray-200 rounded-md cursor-pointer hover:shadow-md'>
			<Avatar className='w-10 h-10 rounded-full bg-blue-200/30 text-gray-500 flex items-center justify-center font-bold'>
				<AvatarImage src={''} />
				<AvatarFallback>
					{client_name.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className='flex w-[87%] justify-between items-start'>
				<div className='flex flex-col justify-between gap-y-10'>
					<div className='flex flex-col gap-y-2'>
						<h4 className='text-lg font-medium'>{client_name}</h4>
						<p className='text-sm text-gray-500 capitalize border border-gray-200 rounded-full px-4 py-1 w-fit'>{service_name}</p>
					</div>
					<div>
						<p>
							{booking_date} {booking_time}
						</p>
						<p>{service_duration} mins</p>
					</div>
				</div>
				<div>
					<MoreHorizontal />
				</div>
			</div>
		</div>
	);
};

export default BookingCard;
