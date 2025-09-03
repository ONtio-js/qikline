'use client';
import React, { useTransition, useState, useRef, useEffect } from 'react';
import { bookFormSchema } from '../../../../schema/schema';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	ArrowLeftIcon,
	CalendarIcon,
	CheckIcon,
	Clock,
	CopyIcon,
	Loader,
	X,
	XIcon,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { bookAppointment } from '@/actions/users/route';
import { toast } from 'sonner';
import Image from 'next/image';

const BookForm = ({
	business,
}: {
	business?: {
		id: number;
		services: {
			id: number;
			name: string;
			duration: number;
			price: number;
		}[];
	} | null;
}) => {
	const form = useForm({
		defaultValues: {
			service: '',
			date: '',
			time: '',
			name: '',
			email: '',
			phone: '',
			notes: '',
			payNow: false,
			payLater: false,
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		criteriaMode: 'all',
		shouldUnregister: false,
		shouldUseNativeValidation: false,
		resolver: zodResolver(bookFormSchema),
	});

	const dateInputRef = React.useRef<HTMLInputElement>(null);
	const timeInputRef = React.useRef<HTMLInputElement>(null);
	const timeDropdownRef = useRef<HTMLDivElement>(null);
	const [, startTransition] = useTransition();
	const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
	const [step, setStep] = useState(1);
	const [bookingId, setBookingId] = useState('');

	const timeSlots: string[] = [];
	for (let hour = 5; hour <= 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const timeString = `${hour.toString().padStart(2, '0')}:${minute
				.toString()
				.padStart(2, '0')}`;
			timeSlots.push(timeString);
		}
	}
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				timeDropdownRef.current &&
				!timeDropdownRef.current.contains(event.target as Node) &&
				timeInputRef.current &&
				!timeInputRef.current.contains(event.target as Node)
			) {
				setIsTimeDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleTimeSelect = (time: string) => {
		form.setValue('time', time);
		setIsTimeDropdownOpen(false);
	};

	const onSubmit = (data: z.infer<typeof bookFormSchema>) => {
		startTransition(async () => {
			const response = await bookAppointment(data);
			if (response.status) {
				setStep(5);
				setBookingId(response.message.tracking_id);
			} else {
				setStep(1);
				const errorMessage =
					response?.message instanceof Error
						? response.message.message
						: response?.message || 'Failed to book appointment';
				toast.error(errorMessage, {
					duration: 3000,
					className: 'bg-red-500 text-white',
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
	return (
		<>
			<Confirmation
				service={form.getValues('service')}
				date={form.getValues('date')}
				time={form.getValues('time')}
				name={form.getValues('name')}
				email={form.getValues('email')}
				phone={form.getValues('phone')}
				notes={form.getValues('notes')}
				payNow={form.getValues('payNow')}
				payLater={form.getValues('payLater')}
				bookingId={bookingId}
				step={step}
				setStep={setStep}
				onSubmit={onSubmit}
				form={form}
			/>
			<div className='w-full max-w-md mx-auto space-y-6'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 mt-5'
					>
						{step === 1 && (
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='service'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel htmlFor='service'>
												Service
											</FormLabel>
											<FormControl>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<SelectTrigger
														className='w-full'
														style={{
															height: '50px',
														}}
													>
														<SelectValue placeholder='Select a service'>
															{business?.services.find(
																(service) =>
																	service.id.toString() ===
																	field.value
															)?.name || ''}
														</SelectValue>
													</SelectTrigger>
													<SelectContent className='border-gray-200 w-full'>
														{business?.services.map(
															(service) => (
																<SelectItem
																	key={
																		service.id
																	}
																	value={service.id.toString()}
																	className='w-full hover:bg-blue-700/20 focus:bg-blue-700/20'
																>
																	<div className='bg-red-800 flex items-center justify-between gap-x-10  '>
																		<div className=' space-y-2'>
																			<p className='font-medium'>
																				{
																					service.name
																				}
																			</p>
																			<p className='font-medium'>
																				{
																					service.duration
																				}{' '}
																				mins
																			</p>
																		</div>
																		<p className='-mr-96 font-medium'>
																			NGN{' '}
																			{
																				service.price
																			}
																		</p>
																	</div>
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='date'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel htmlFor='date'>
												Date
											</FormLabel>
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
											<FormLabel htmlFor='time'>
												Time
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														type='text'
														{...field}
														placeholder='Select a time'
														className='w-full h-[50px] pr-10 cursor-pointer'
														ref={timeInputRef}
														onClick={() =>
															setIsTimeDropdownOpen(
																!isTimeDropdownOpen
															)
														}
														readOnly
													/>
													<Clock className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />

													{/* Time Dropdown */}
													{isTimeDropdownOpen && (
														<div
															ref={
																timeDropdownRef
															}
															className='absolute z-50 w-full grid grid-cols-3 gap-2 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto no-scrollbar'
														>
															{timeSlots.map(
																(time) => (
																	<div
																		key={
																			time
																		}
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
																)
															)}
														</div>
													)}
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						)}
						{step === 2 && (
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel htmlFor='name'>
												Name
											</FormLabel>
											<FormControl>
												<Input
													type='text'
													{...field}
													placeholder='Enter your name'
													className='w-full h-[50px]'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel htmlFor='email'>
												Email
											</FormLabel>
											<FormControl>
												<Input
													type='email'
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
									name='phone'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel htmlFor='phone'>
												Phone
											</FormLabel>
											<FormControl>
												<Input
													type='tel'
													{...field}
													placeholder='Enter your phone number'
													className='w-full h-[50px]'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						)}
						{step > 2 && (
							<div className='space-y-4'>
								<div className='space-y-1'>
									<h4 className=' font-semibold text-gray-800'>
										Booking Preference
									</h4>
									<p className='text-gray-500 text-sm'>
										How would you like to secure your
										booking?
									</p>
								</div>
								<div className='flex items-center gap-x-4'>
									<input
										type='radio'
										name='payment'
										id='payNow'
										className='w-[25px] h-[25px] rounded-md'
										onChange={() => {
											form.setValue('payNow', true);
											form.setValue('payLater', false);
										}}
									/>
									<div
										onClick={() => {
											form.setValue('payNow', true);
											form.setValue('payLater', false);
										}}
										className={`w-full border-[1px] rounded-md p-2 flex items-center gap-x-2 ${
											form.watch('payNow') === true
												? 'border-blue-400'
												: 'border-gray-200'
										}`}
									>
										<Image
											src='/paynow.svg'
											alt='secure'
											width={20}
											height={20}
										/>
										<div className='space-y-1 text-gray-500'>
											<p className='text-gray-700 text-sm font-medium'>
												Pay Now
											</p>
											<p className='text-sm font-medium'>
												Instant Confirmation
											</p>
										</div>
									</div>
								</div>
								<div className='flex items-center gap-x-4'>
									<input
										type='radio'
										name='payment'
										id='payLater'
										className='w-[25px] h-[25px] rounded-md'
										onChange={() => {
											form.setValue('payLater', true);
											form.setValue('payNow', false);
										}}
									/>
									<div
										onClick={() => {
											form.setValue('payLater', true);
											form.setValue('payNow', false);
										}}
										className={`w-full border-[1px] rounded-md p-2 flex items-center gap-x-2 ${
											form.watch('payLater') === true
												? 'border-blue-400'
												: 'border-gray-200'
										}`}
									>
										<Image
											src='/paylater.svg'
											alt='secure'
											width={20}
											height={20}
										/>
										<div className='space-y-1 text-gray-500'>
											<p className='text-gray-700 text-sm font-medium'>
												Pay Later
											</p>
											<p className='text-sm font-medium'>
												Confirm now, pay later
											</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{step === 2 ? (
							<div className='flex items-center '>
								<div className='flex items-center justify-start bg-gray-100 p-2 rounded-md'>
									<ArrowLeftIcon
										className='w-5 h-5'
										onClick={() => setStep(1)}
									/>
								</div>
								<Button
									onClick={() => {
										const name = form.getValues('name');
										const email = form.getValues('email');
										const phone = form.getValues('phone');
										if (!phone || !email || !name) {
											toast.error(
												'Please fill all the fields'
											);
											return;
										}
										setStep(3);
									}}
									type='button'
									className='w-48 h-[50px] mt-2 bg-blue-700 text-white hover:bg-blue-800 mx-auto'
								>
									Secure Your Spot
								</Button>
							</div>
						) : step >= 2 ? (
							<div className='mt-10'>
								{form.watch('payNow') === true && (
									<div className='w-full h-[60px]  bg-gray-100 rounded-lg flex items-center justify-between px-4 border border-blue-200'>
										<h4 className='text-gray-700 text-sm font-medium'>
											Payment gateway
										</h4>
									</div>
								)}
								{form.getValues('payLater') === true && (
									<Button
										type='button'
										onClick={() => {
											setStep(4);
										}}
										className='w-48 h-[50px] mt-2 bg-blue-700 text-white hover:bg-blue-800 mx-auto'
									>
										Book Appointment
									</Button>
								)}
							</div>
						) : (
							step != 4 &&
							step != 3 && (
								<Button
									type='button'
									onClick={() => {
										const service =
											form.getValues('service');
										const date = form.getValues('date');
										const time = form.getValues('time');

										if (!service || !date || !time) {
											toast.error(
												'Please fill all the fields',
												{
													duration: 3000,
													className:
														'bg-red-500 text-white',
													position: 'top-right',
													icon: (
														<XIcon className='w-4 h-4' />
													),
													style: {
														backgroundColor: 'red',
														color: 'white',
													},
												}
											);
											return;
										}
										setStep(2);
									}}
									className='w-48 h-[50px] mt-2 bg-blue-700 text-white hover:bg-blue-800 mx-auto'
								>
									Next: Your Info
								</Button>
							)
						)}
					</form>
				</Form>
			</div>
		</>
	);
};
const Confirmation = ({
	service,
	date,
	time,
	name,
	email,
	phone,
	notes,
	payNow,
	payLater,
	bookingId,
	step,
	setStep,
	onSubmit,
	form,
}: {
	service: string;
	date: string;
	time: string;
	name: string;
	email: string;
	phone: string;
	notes?: string | null | undefined;
	payNow?: boolean | null | undefined;
	payLater?: boolean | null | undefined;
	bookingId?: string | null | undefined;
	step: number;
	setStep: (number: number) => void;
	onSubmit: (data: z.infer<typeof bookFormSchema>) => void;
	form: UseFormReturn<{
		service: string;
		date: string;
		time: string;
		name: string;
		email: string;
		phone: string;
		notes?: string | null;
		payNow?: boolean | null;
		payLater?: boolean | null;
	}>;
}) => {
	const [isPending, startTransition] = useTransition();
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black/50 flex md:items-center items-end justify-center z-50 ${
				step === 4 || step === 5 ? 'block' : 'hidden'
			}`}
		>
			{step === 5 && (
				<div className='space-y-4 bg-white rounded-md p-10 flex flex-col items-center w-full max-w-3xl max-h-[60vh] overflow-y-auto no-scrollbar '>
					<div className='flex items-center justify-end w-full'>
						<X
							onClick={() => setStep(step - 1)}
							className='w-5 h-5'
						/>
					</div>
					<div className='bg-blue-400/10 rounded-md p-4 w-full border border-blue-500'>
						<div className='flex items-center justify-between'>
							<p>Booking ID:</p>{' '}
							<div className='flex items-center gap-x-2'>
								<p className='font-medium text-blue-700'>
									#{bookingId}
								</p>
								<p
									className='cursor-pointer'
									onClick={() => {
										navigator.clipboard.writeText(
											`${bookingId}`
										);
										toast.success(
											'Booking ID copied to clipboard',
											{
												duration: 3000,
												className:
													'bg-green-500 text-white',
												position: 'top-right',
												icon: (
													<CheckIcon className='w-4 h-4' />
												),
											}
										);
									}}
								>
									<CopyIcon className='w-5 h-5' />
								</p>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<p>Service:</p> <p>{service}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p>Date:</p> <p>{date}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p>Time:</p> <p>{time}</p>
						</div>
					</div>
					<h2 className='text-lg font-semibold text-gray-800'>
						Booking Successful
					</h2>
					<p className='text-gray-700 text-sm text-center'>
						Your appointment has been successfully booked. You will
						receive an email with your details.
					</p>
					<Button
						className='w-48 h-[50px]  bg-blue-700 text-white hover:bg-blue-800 mx-auto'
						onClick={() => {
							form.reset();
							window.history.back();
						}}
					>
						Finish
					</Button>
				</div>
			)}
			{step === 4 && (
				<div className='space-y-4 bg-white rounded-md p-10 flex flex-col items-center w-full max-w-3xl max-h-[70vh] overflow-y-auto no-scrollbar'>
					<div className='flex items-center justify-between w-full'>
						<h4 className='text-lg font-semibold text-gray-800'>
							Booking Confirmation
						</h4>
						<div>
							<X
								className='w-5 h-5'
								onClick={() => setStep(step - 1)}
							/>
						</div>
					</div>
					<div className=' mt-10 w-5/6 border border-blue-400 rounded-md p-4 bg-blue-600/10 '>
						<div className='flex items-center justify-between'>
							<p>Service:</p> <p>{service}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p>Date:</p> <p>{date}</p>
						</div>
						<div className='flex items-center justify-between'>
							<p>Time:</p> <p>{time}</p>
						</div>
					</div>
					<h2 className='text-lg font-semibold text-gray-800'>
						Confirm Your Booking
					</h2>
					<p className='text-gray-500 text-sm w-full text-center'>
						Are you sure you want to proceed with this booking?
					</p>
					<div className='flex gap-4'>
						<Button
							className='w-48 h-[50px] mt-2 bg-blue-700 text-white hover:bg-blue-800'
							type='submit'
							onClick={() => {
								// Get all form values and submit
								const formData = {
									service: service,
									date: date,
									time: time,
									name: name,
									email: email,
									phone: phone,
									notes: notes || '',
									payNow: payNow || false,
									payLater: payLater || true,
								};
								startTransition(async () => {
									await onSubmit(
										formData as z.infer<
											typeof bookFormSchema
										>
									);
								});
							}}
							disabled={isPending}
						>
							{isPending ? (
								<Loader className='w-5 h-5 animate-spin' />
							) : (
								'Book Appointment'
							)}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
export default BookForm;
