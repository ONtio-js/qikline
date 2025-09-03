'use client';
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
} from '@/components/ui/select';

import { SelectItem } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { bookingSettingsSchema } from '../../../../schema/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { useTransition, useEffect, useState } from 'react';
import {
	getBookingSettings,
	updateBookingSettings,
} from '@/actions/admin/businessMgt/route';
import { toast } from 'sonner';
import { CheckIcon, Loader2, XIcon } from 'lucide-react';

export const BookingSetting = () => {
	
	const [isPending, startTransition] = useTransition();
	const [bookingSettings, setBookingSettings] = useState<
		z.infer<typeof bookingSettingsSchema>
	>({
		is_booking_enabled: true,
		is_deposit_required: true,
		cancellation_notice: 0.25,
		advance_booking_time: 0.25,
	});
	const form = useForm<z.infer<typeof bookingSettingsSchema>>({
		resolver: zodResolver(bookingSettingsSchema),
		defaultValues: {
			is_booking_enabled: bookingSettings.is_booking_enabled || true,
			is_deposit_required: bookingSettings.is_deposit_required || true,
			cancellation_notice: bookingSettings.cancellation_notice || 0.25,
			advance_booking_time:  bookingSettings.advance_booking_time || 0.25,
		},
	});

	useEffect(() => {
		const fetchBookingSettings = async () => {
			const response = await getBookingSettings();
			if (response.status) {
				const settings = response.data as z.infer<
					typeof bookingSettingsSchema
				>;
				setBookingSettings(settings);
				form.setValue('is_booking_enabled', settings.is_booking_enabled);
				form.setValue('is_deposit_required', settings.is_deposit_required);
				form.setValue('cancellation_notice', settings.cancellation_notice);
				form.setValue('advance_booking_time', settings.advance_booking_time);
			}
		};
		fetchBookingSettings();
	}, [form]);
	const onSubmit = (data: z.infer<typeof bookingSettingsSchema>) => {
		startTransition(async () => {
			const response = await updateBookingSettings(data);
			if (response.status) {
				toast.success(response.message, {
					duration: 3000,
					className: 'bg-green-500 text-white',
					position: 'top-right',
					icon: <CheckIcon className='w-4 h-4' />,
					style: {
						backgroundColor: 'green',
						color: 'white',
					},
				});
				form.reset();
			} else {
				toast.error(response.message, {
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
	console.log(bookingSettings);
	return (
		<div className='p-4 md:px-8 border border-gray-200 rounded-lg max-w-[1000px] mb-10'>
			<div className='flex items-center justify-between my-6'>
				<h4 className='text-lg font-semibold text-gray-800'>
					Booking Preferences
				</h4>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<div className='pt-8 space-y-6 '>
						<div className='flex items-center justify-between border-b border-gray-200 pb-4'>
							<FormField
								control={form.control}
								name='is_booking_enabled'
								render={({ field }) => (
									<FormItem className='flex items-center justify-between w-full'>
										<div className='flex flex-col gap-2'>
											<FormLabel className='text-lg font-semibold text-gray-600'>
												Accept Online Bookings
											</FormLabel>
											<p className='text-gray-500 mt-2 '>
												Allow customers to book
												appointments online
											</p>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className='flex items-center justify-between border-b border-gray-200 pb-4'>
							<FormField
								control={form.control}
								name='is_deposit_required'
								render={({ field }) => (
									<FormItem className='flex items-center justify-between w-full'>
										<div className='flex flex-col gap-2'>
											<FormLabel className='text-lg font-semibold text-gray-600'>
												Require Deposit
											</FormLabel>
											<p className='text-gray-500 mt-2 '>
												Require customers to pay a
												deposit for all bookings
											</p>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className='pb-4 space-y-2'>
							<FormField
								control={form.control}
								name='cancellation_notice'
								render={({ field }) => (
									<FormItem className='flex flex-col  justify-between w-full'>
										<div className='flex flex-col gap-2'>
											<FormLabel className='text-lg font-semibold text-gray-600'>
												Reschedule Notice
											</FormLabel>
											<p className='text-gray-500 mt-2 '>
												Send a cancellation notice to
												customers 4 hours before the
												appointment
											</p>
										</div>
										<FormControl>
											<Select
												value={field.value.toString()}
												onValueChange={(value) =>
													field.onChange(
														parseInt(value)
													)
												}
											>
												<SelectTrigger
													className='w-full h-12 border-gray-200'
													style={{
														height: '50px',
													}}
												>
													<SelectValue placeholder='Select a cancellation notice' />
												</SelectTrigger>
												<SelectContent className='border-gray-200 '>
													<SelectItem value='0.25'>
														15 minutes
													</SelectItem>
													<SelectItem value='0.5'>
														30 minutes
													</SelectItem>
													<SelectItem value='0.75'>
														45 minutes
													</SelectItem>
													<SelectItem value='1'>
														1 hour
													</SelectItem>
													<SelectItem value='1.5'>
														1.5 hours
													</SelectItem>
													<SelectItem value='2'>
														2 hours
													</SelectItem>
													<SelectItem value='2.5'>
														2.5 hours
													</SelectItem>
													<SelectItem value='3'>
														3 hours
													</SelectItem>
													<SelectItem value='3.5'>
														3.5 hours
													</SelectItem>
													<SelectItem value='4'>
														4 hours
													</SelectItem>
													<SelectItem value='4.5'>
														4.5 hours
													</SelectItem>
													<SelectItem value='5'>
														5 hours
													</SelectItem>
													<SelectItem value='5.5'>
														5.5 hours
													</SelectItem>
													<SelectItem value='6'>
														6 hours
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='pb-4 space-y-2'>
							<FormField
								control={form.control}
								name='advance_booking_time'
								render={({ field }) => (
									<FormItem className='flex flex-col items- justify-between w-full'>
										<div className='flex flex-col gap-2'>
											<FormLabel className='text-lg font-semibold text-gray-600'>
												Advance Booking Time
											</FormLabel>
											<p className='text-gray-500 mt-2 '>
												Minimum time required between
												bookings and appointments
											</p>
										</div>
										<FormControl>
											<Select
												value={field.value.toString()}
												onValueChange={(value) =>
													field.onChange(
														parseInt(value)
													)
												}
											>
												<SelectTrigger
													className='w-full h-12 border-gray-200'
													style={{
														height: '50px',
													}}
												>
													<SelectValue placeholder='Select a advance booking time' />
												</SelectTrigger>
												<SelectContent className='border-gray-200 '>
													<SelectItem value='0.25'>
														15 Minutes
													</SelectItem>
													<SelectItem value='0.5'>
														30 Minutes
													</SelectItem>
													<SelectItem value='0.75'>
														45 Minutes
													</SelectItem>
													<SelectItem value='1'>
														1 Hour
													</SelectItem>
													<SelectItem value='1.5'>
														1.5 Hours
													</SelectItem>
													<SelectItem value='2'>
														2 Hours
													</SelectItem>
													<SelectItem value='2.5'>
														2.5 Hours
													</SelectItem>
													<SelectItem value='3'>
														3 Hours
													</SelectItem>
													<SelectItem value='3.5'>
														3.5 Hours
													</SelectItem>
														<SelectItem value='4'>
														4 Hours
													</SelectItem>
													<SelectItem value='4.5'>
														4.5 Hours
													</SelectItem>
													<SelectItem value='5'>
														5 Hours
													</SelectItem>
													<SelectItem value='5.5'>
														5.5 Hours
													</SelectItem>
													<SelectItem value='6'>
														6 Hours
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='flex justify-start gap-4 my-10'>
							<Button
								disabled={isPending}
								type='submit'
								className='sm:w-xs w-full h-12 bg-blue-700 text-white text-[16px] hover:bg-blue-800 font-semibold'
							>
								{isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Save Changes'}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};
