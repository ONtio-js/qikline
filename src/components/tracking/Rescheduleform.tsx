import { ArrowLeft, CalendarIcon, Clock, Loader, X, XIcon } from 'lucide-react';
import React, { useEffect, useState, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form';
import { rescheduleFormSchema } from '../../../schema/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { rescheduleBooking } from '../../actions/users/route';
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
	created_at: string;
	date: string;
	time: string;
	service: ServiceData;
	status: string;
	status_display: string;
	tracking_id: string;
	updated_at: string;
} | null;
const RescheduleForm = ({
	onClose,
	bookingData,
	onBack,
	onRescheduleConfirmation,
}: {
	onClose: () => void;
	bookingData: BookingData;
	onBack: () => void;
	onRescheduleConfirmation: () => void;
}) => {
	const [isPending, startTransition] = useTransition();
	const dateInputRef = useRef<HTMLInputElement>(null);
	const form = useForm<z.infer<typeof rescheduleFormSchema>>({
		defaultValues: {
			bookingId: bookingData?.id.toString() || '',
			date: bookingData?.date || '',
			email: '',
			time: '',
		},
		resolver: zodResolver(rescheduleFormSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
		criteriaMode: 'all',
		shouldUnregister: false,
		shouldUseNativeValidation: false,
	});
	const onSubmit = (data: z.infer<typeof rescheduleFormSchema>) => {
		startTransition(async () => {
			const response = await rescheduleBooking(data);
			console.log(response);
			if (response?.status) {
				
				onRescheduleConfirmation();
			} else {
				toast.error(response?.message as string, {
					duration: 3000,
					position: 'top-right',
				
					icon: <XIcon className='w-4 h-4' />,
					style: {
						backgroundColor: 'red',
						color: 'white',
					},
				});
			}
		});
	};
	const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
	const timeDropdownRef = useRef<HTMLDivElement>(null);
	const timeSlots: string[] = [];
	for (let hour = 5; hour <= 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const timeString = `${hour.toString().padStart(2, '0')}:${minute
				.toString()
				.padStart(2, '0')}`;
			timeSlots.push(timeString);
		}
	}
	const handleTimeSelect = (time: string) => {
		form.setValue('time', time);
		setIsTimeDropdownOpen(false);
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				timeDropdownRef.current &&
				!timeDropdownRef.current.contains(event.target as Node)
			) {
				setIsTimeDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className='w-[90%] md:w-2xl bg-white rounded-lg px-5 py-10 md:p-10 overflow-y-auto no-scrollbar max-h-[80vh]'
		>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-x-5'>
					<ArrowLeft
						className='w-5 h-5'
						onClick={onBack}
					/>
					<div className='flex flex-col gap-y-1 '>
						<h1 className='text-lg font-semibold'>
							Reschedule Appointment
						</h1>
						<div className=' p-1 w-fit px-2 rounded-lg flex items-center gap-x-2 text-gray-700 text-sm'>
							Choose a new date and time
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
			<div className='mt-5 border border-gray-200 rounded-lg p-5'>
				<h3 className='text-gray-600 font-medium'>
					Current Appointment
				</h3>
				<p className='text-gray-800 font-semibold mt-2'>
					{bookingData?.service?.name || 'N/A'}
				</p>
				<p className='text-gray-600'>
					{bookingData?.date || 'N/A'} at {bookingData?.time || 'N/A'}
				</p>
			</div>

			<h4 className='text-gray-800 font-semibold mt-5 text-lg'>
				Choose New Schedule
			</h4>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4 mt-10'
				>
					<FormField
						control={form.control}
						name='bookingId'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='hidden'
										{...field}
										placeholder='Enter your booking id'
										className='w-full h-[50px] '
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Enter your email'
										className='w-full h-[50px]'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='date'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type='date'
											{...field}
											placeholder='Select a date'
											className='w-full h-[50px] pr-10 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden'
											ref={dateInputRef}
										/>
										<CalendarIcon
											className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600'
											onClick={() =>
												dateInputRef.current?.showPicker?.() ||
												dateInputRef.current?.click()
											}
										/>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='time'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='time'>Time</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type='text'
											{...field}
											placeholder='Select a time'
											className='w-full h-[50px] pr-10 cursor-pointer'
											ref={field.ref}
											onClick={() =>
												setIsTimeDropdownOpen(
													!isTimeDropdownOpen
												)
											}
											readOnly
										/>
										<Clock className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />

										{isTimeDropdownOpen && (
											<div
												ref={timeDropdownRef}
												className='absolute z-50 w-full grid grid-cols-3 gap-2 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto no-scrollbar'
											>
												{timeSlots.map((time) => (
													<div
														key={time}
														className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm rounded-md border flex items-center gap-x-2 justify-center'
														onClick={() =>
															handleTimeSelect(
																time
															)
														}
													>
														<Clock className='w-5 h-5 text-gray-400' />
														{time}
													</div>
												))}
											</div>
										)}
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className='flex justify-end mt-5'>
						<Button
							type='submit'
							className='w-full h-[50px] bg-blue-700 text-white hover:bg-blue-800 max-w-xs mx-auto'
							disabled={isPending || !form.formState.isValid}
						>
							{isPending ? (
								<Loader className='w-5 h-5 animate-spin' />
							) : (
								'Confirm Reschedule'
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RescheduleForm;
