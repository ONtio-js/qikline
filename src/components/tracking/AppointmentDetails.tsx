import { ArrowLeft, CheckCircleIcon, CopyIcon, X } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import BusinessCard from '../customer/BusinessCard';

type ServiceData = {
	id: number;
	name: string;
	category: string;
	category_display: string;
	description: string;
	duration: number;
	is_active: boolean;
	price: string;
	created_at: string;
	updated_at: string;
};

type BookingData = {
	id: number;
	business_name: string;
	business_description: string;
	business_address: string;
	created_at: string;
	date: string;
	time: string;
	service: ServiceData;
	status: string;
	status_display: string;
	tracking_id: string;
	updated_at: string;
} | null;
const AppointmentDetails = ({
	onClose,
	bookingData,
	onBack,
	onReschedule,
}: {
	onClose: () => void;
	bookingData: BookingData;
	onBack: () => void;
	onReschedule: () => void;
}) => {
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className=' bg-white rounded-lg px-5 py-10 md:p-10 w-[90%] md:w-2xl overflow-y-auto no-scrollbar max-h-[80vh]'
		>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-x-5'>
					<ArrowLeft
						className='w-5 h-5'
						onClick={onBack}
					/>
					<div className='flex flex-col gap-y-1 '>
						<h1 className='text-lg font-semibold'>
							Booking Details
						</h1>
						<div className='bg-emerald-500/10 p-1 w-fit px-2 rounded-lg flex items-center gap-x-2 text-emerald-700 text-sm'>
							<CheckCircleIcon className='w-4 h-4 text-emerald-700' />
							Confirmed
						</div>
					</div>
				</div>
				<div
					className='cursor-pointer bg-gray-100 rounded-full p w-7 h-7 flex items-center justify-center'
					onClick={onClose}
				>
					<X className='w-5 h-5' />
				</div>
			</div>
			<div className='flex items-center justify-end mt-5'>
				<Button
					className='w-32 h-[45px] bg-blue-700 text-white hover:bg-blue-800'
					onClick={onReschedule}
				>
					Reschedule
				</Button>
			</div>
			<div className='mt-5 border border-gray-200 rounded-lg p-5'>
				<div className='flex items-center justify-between'>
					<h3 className='text-gray-600'>Booking ID</h3>
					<CopyIcon
						className='w-4 h-4 md:w-5 md:h-5 cursor-pointer'
						onClick={() => {
							navigator.clipboard.writeText(
								bookingData?.tracking_id || ''
							);
							toast.success('Booking ID copied to clipboard');
						}}
					/>
				</div>
				<p className='  bg-blue-500/10 p-2 text-lg uppercase rounded-md mt-2 text-center text-blue-700'>
					{bookingData?.tracking_id || '#456bgtt'}
				</p>
			</div>
			<div className='my-5 border border-gray-200 rounded-lg p-5'>
				<h3 className='text-gray-800 font-semibold'>
					Appointment Details
				</h3>
				<div className='space-y-2'>
					<div className='flex items-center justify-between'>
						<p className='text-gray-600'>Service:</p>
						<p className='text-gray-800 font-medium'>
							{bookingData?.service?.name || 'N/A'}
						</p>
					</div>
					<div className='flex items-center justify-between'>
						<p className='text-gray-600'>Date:</p>
						<p className='text-gray-800 font-medium'>
							{bookingData?.date || 'N/A'}
						</p>
					</div>
					<div className='flex items-center justify-between'>
						<p className='text-gray-600'>Time:</p>
						<p className='text-gray-800 font-medium'>
							{bookingData?.time || 'N/A'}
						</p>
					</div>
				</div>
			</div>
			{bookingData?.business_name && (
				<BusinessCard
					business={{
						id: 0, 
						name: bookingData.business_name,
						image: '/cus1.jpg', 
						location: bookingData.business_address, 
						city: '',
						state: '',
						description: bookingData.business_description,
						category: [],
						rating: 0, 
						address: bookingData.business_address, 
					}}
				/>
			)}
			<div className='mt-5 border border-gray-200 rounded-lg p-5'>
				<h3 className='text-blue-700 font-semibold mb-2 text-lg'>
					Important Notice
				</h3>
				<ul className='list-disc list-inside text-gray-700 text-sm space-y-2'>
					<li>
						You must arrive 15 minutes before your appointment time.
					</li>
					<li>
						If you are late, your appointment may be rescheduled.
					</li>
					<li>
						Reshcedules easily 2hours prior to your appointment.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AppointmentDetails;
