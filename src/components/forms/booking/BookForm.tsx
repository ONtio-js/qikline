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
import { CalendarIcon, CheckIcon, Clock, XIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { bookAppointment } from '@/actions/users/route';
import { toast } from 'sonner';

const BookForm = ({
	business,
}: {
	business?: {
		id: number;
		services: {
			id: number;
			name: string;
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
	const [isPending, startTransition] = useTransition();
	const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

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
				toast.success(
					response?.message || 'Appointment booked successfully',
					{
						duration: 3000,
						className: 'bg-green-500 text-white',
						position: 'top-right',
						icon: <CheckIcon className='w-4 h-4' />,
						style: {
							backgroundColor: 'green',
							color: 'white',
						},
					},
				);
			} else {
				// Handle both string messages and Error objects
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
		<div className='w-full max-w-md mx-auto space-y-6'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4 mt-5'
				>
					<FormField
						control={form.control}
						name='service'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='service'>Service</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger
											className='w-full'
											style={{ height: '50px' }}
										>
											<SelectValue placeholder='Select a service'>
												{business?.services.find(
													(service) =>
														service.id.toString() ===
														field.value
												)?.name || ''}
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											{business?.services.map(
												(service) => (
													<SelectItem
														key={service.id}
														value={service.id.toString()}
													>
														{service.name}
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
								<FormLabel htmlFor='date'>Date</FormLabel>
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
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel htmlFor='name'>Name</FormLabel>
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
								<FormLabel htmlFor='email'>Email</FormLabel>
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
								<FormLabel htmlFor='phone'>Phone</FormLabel>
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

					<Button
						type='submit'
						className='w-48 h-[50px] mt-2 bg-blue-700 text-white hover:bg-blue-800 mx-auto'
						disabled={isPending || !form.formState.isValid}
					>
						{isPending ? 'Booking...' : 'Book Appointment'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default BookForm;
