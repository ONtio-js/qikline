'use client';
import { Loader, X, XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import AppointmentDetails from './AppointmentDetails';
import RescheduleForm from './Rescheduleform';
import RescheduleConfirmation from './RescheduleConfirmation';
import { useTransition } from 'react';
import { toast } from 'sonner';

const TrackingLanding = ({
	onClose,
	isOpen,
}: {
	onClose: () => void;
	isOpen: boolean;
}) => {
	const trackingIdRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState('');
	const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] =
		useState(false);
	const [isRescheduleFormOpen, setIsRescheduleFormOpen] = useState(false);
	const [isRescheduleConfirmationOpen, setIsRescheduleConfirmationOpen] =
		useState(false);
	const [bookingData, setBookingData] = useState<{
		id: number;
		business_name: string;
		business_description: string;
		business_address: string;
		created_at: string;
		date: string;
		time: string;
		service: {
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
		status: string;
		status_display: string;
		tracking_id: string;
		updated_at: string;
	} | null>(null);
	console.log(bookingData);
	const [isPending, startTransition] = useTransition();

	const onTrackBooking = async () => {
		startTransition(async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/bookings/track/${inputValue}/`
				);
				const data = await response.json();
				console.log('API Response:', data); // Debug log

				if (data.data) {
					setBookingData(data.data);
					setIsAppointmentDetailsOpen(true);
				} else {
					toast.error('Booking not found try again', {
						duration: 3000,
						position: 'top-right',
						className: 'bg-red-500 text-white',
						icon: <XIcon className='w-4 h-4' />,
						style: {
							backgroundColor: 'red',
							color: 'white',
						},
					});
				}
			} catch (error) {
				console.error('Error tracking booking:', error);
				toast.error('Error tracking booking. Please try again.', {
					duration: 3000,
					position: 'top-right',
					className: 'bg-red-500 text-white',
					icon: <XIcon className='w-4 h-4' />,
					style: {
						backgroundColor: 'red',
						color: 'white',
					},
				});
			}
		});
	};
	return (
		<div
			className={`w-full h-screen flex pt-20 justify-center fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/70 ${
				isOpen ? 'block' : 'hidden'
			}`}
			onClick={onClose}
		>
			{isRescheduleFormOpen && (
				<RescheduleForm
					onClose={() => onClose()}
					bookingData={bookingData}
					onRescheduleConfirmation={() => {
						setIsRescheduleConfirmationOpen(true);
						setIsAppointmentDetailsOpen(false);
						setIsRescheduleFormOpen(false);
					}}
					onBack={() => {
						setIsRescheduleFormOpen(false);
						setIsAppointmentDetailsOpen(true);
					}}
				/>
			)}
			{isAppointmentDetailsOpen && (
				<AppointmentDetails
					onClose={onClose}
					bookingData={bookingData}
					onBack={() => setIsAppointmentDetailsOpen(false)}
					onReschedule={() => {
						setIsRescheduleFormOpen(true);
						setIsAppointmentDetailsOpen(false);
					}}
				/>
			)}
			{isRescheduleConfirmationOpen && (
				<RescheduleConfirmation
					onClose={onClose}
					bookingData={bookingData}
				/>
			)}
			{!isRescheduleFormOpen &&
				!isAppointmentDetailsOpen &&
				!isRescheduleConfirmationOpen && (
					<div
						className='w-[90%] md:w-2xl bg-white rounded-lg md:p-8 p-4 max-h-[80vh] h-fit'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='flex items-center justify-between'>
							<div className='w-[87%] md:w-full'>
								<h1 className='text-xl font-semibold'>
									Track Your Booking
								</h1>
								<p className='text-sm text-gray-500'>
									Enter your 6-digit booking ID to view and
									manage your appointment.
								</p>
							</div>
							<div className='flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full'>
								<X
									onClick={onClose}
									className='w-5 h-5'
								/>
							</div>
						</div>
						<label
							htmlFor='booking-id'
							className='font-medium mt-5 block mb-2 text-gray-500'
						>
							Booking ID
						</label>
						<div className='flex items-center justify-center '>
							<input
								type='text'
								placeholder='Enter your booking ID'
								className='w-full md:h-14 h-10 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
								id='booking-id'
								ref={trackingIdRef}
								value={inputValue}
								onChange={(e) => {
									setInputValue(e.target.value);
								}}
								// maxLength={6}
							/>
						</div>
						<div
							className={`${
								inputValue.length > 0 ? 'flex' : 'hidden'
							} items-center justify-center`}
						>
							<Button
								className='w-full mt-5 max-w-xs mx-auto md:h-14 h-10 rounded-md bg-blue-700 hover:bg-blue-800 text-white'
								onClick={onTrackBooking}
								disabled={isPending}
							>
								{isPending ? (
									<Loader className='w-5 h-5 animate-spin' />
								) : (
									'Track Booking'
								)}
							</Button>
						</div>

						<div className='mt-5 border border-blue-600 p-4  md:p-5 rounded-lg bg-blue-400/10'>
							<h4 className='text-gray-800 font-semibold md:text-lg text-sm mb-2'>
								Need help finding your booking ID?
							</h4>
							<ul className='list-disc list-inside text-gray-700 text-sm space-y-2'>
								<li className='text-xs font-medium md:text-sm'>Checcck your confirmation email</li>
								<li className='text-xs font-medium md:text-sm'>Look for 6-digit booking code</li>
							</ul>
						</div>
					</div>
				)}
		</div>
	);
};

export default TrackingLanding;
