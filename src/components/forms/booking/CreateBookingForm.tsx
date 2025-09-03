'use client';
import { X } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectContent,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useBusiness } from '@/hooks/useBusiness';
import { Resolver, useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookFormSchema } from '../../../../schema/schema';
import { z } from 'zod';
import TimeSelection from './TimeSelection';
import { createBooking } from '@/actions/admin/Booking/route';
import { toast } from 'sonner';
type CreateBookingFormProps = {
	isOpen: boolean;
	onClose: () => void;
};

const CreateBookingForm = ({ isOpen, onClose }: CreateBookingFormProps) => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const { businessData } = useBusiness();
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof bookFormSchema>>({
		resolver: zodResolver(bookFormSchema) as unknown as Resolver<
			z.infer<typeof bookFormSchema>,
			unknown
		>,
		defaultValues: {
			service: '',
			name: '',
			date: date?.toLocaleDateString(),
			time: '',
			phone: '',
			email: '',
			notes: '',
			payNow: false,
			payLater: false,
		},
	});

	const onSubmit = (data: z.infer<typeof bookFormSchema>) => {
		startTransition(async () => {
			const response = await createBooking(data);
			console.log(response);
			if (response.status) {
				toast.success(response?.message as string);
				form.reset();
				setDate(new Date());
				onClose();
			} else {
				toast.error(response?.message as string);
			}
		});
	};
	return (
		<div
			className={` backdrop-blur flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/20 z-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
			onClick={onClose}
		>
			<motion.div
				initial={{
					y: 200,
					opacity: 0,
				}}
				whileInView={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					duration: 0.2,
					ease: 'easeIn',
					delay: 0.2,
				}}
				onClick={(e) => e.stopPropagation()}
				className='w-full md:w-[80%] h-[85%] bg-white rounded-t-3xl md:rounded-3xl bottom-0 md:bottom-auto absolute p-6 md:p-10 space-y-6 overflow-y-auto no-scrollbar'
			>
				<div className='flex justify-between items-center '>
					<h4 className='text-lg font-medium'>New Booking</h4>
					<X
						size={20}
						onClick={onClose}
						className='cursor-pointer hover:text-gray-500 transition-all duration-300 text-gray-400'
					/>
				</div>
				<div className='space-y-2 w-full'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 w-full'
						>
							<FormField
								control={form.control}
								name='service'
								render={({ field }) => (
									<FormItem>
										<FormLabel> Select Service</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger
												className='w-full'
												style={{ height: '50px' }}
											>
												<SelectContent>
													{businessData?.services?.map(
														(service: {
															id: string | number;
															name: string;
														}) => (
															<SelectItem
																key={service.id}
																value={service.id.toString()}
															>
																{service.name}
															</SelectItem>
														)
													)}
												</SelectContent>
												<SelectValue
													placeholder='Select a service'
													className='text-gray-500'
												/>
											</SelectTrigger>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter Customer Name'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter Customer Phone'
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
												className='h-12'
												placeholder='Enter Customer Email'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Separator className='my-6' />
							<div className='flex flex-col md:flex-row gap-y-4 md:gap-x-10 w-full md:items-start mt-10'>
								<FormField
									control={form.control}
									name='date'
									render={({ field }) => (
										<FormItem className='md:w-1/2'>
											<FormLabel>Select Date</FormLabel>
											<FormControl>
												<div className='flex items-center gap-x-2 w-full md:w-auto'>
													{/* <Input
														{...field}
														
														className='hidden'
														placeholder='Enter Booking Date'
													/> */}
													<Calendar
														{...field}
														className='w-full  rounded-md border cursor-pointer'
														mode='single'
														selected={date}
														onSelect={setDate}
														onDayClick={(date) =>
															setDate(date)
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
										<FormItem className='md:w-1/2'>
											<FormLabel className='mt-5 w-full'>
												Select Time
											</FormLabel>
											<FormControl>
												<div>
													<Input
														{...field}
														className='hidden'
													/>
													<div className='max-h-64 w-full overflow-y-auto no-scrollbar border mt-5 border-gray-200 rounded-lg'>
														<TimeSelection
															field={field}
															form={form}
														/>
													</div>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='notes'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Notes{' '}
											<span className='text-blue-500 text-sm'>
												{' '}
												(optional)
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value || ''}
												className='h-12'
												placeholder='Enter Booking Notes (optional)'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='flex flex-col gap-y-4 mt-7'>
								<Separator className='my-6' />
								<div className='flex flex-col gap-y-2 p-5 bg-gray-100 rounded-md border border-blue-500'>
									<h3 className=' font-medium text-gray-800 mb-3'>
										Booking summary
									</h3>
									<div className='flex flex-col gap-y-2'>
										<p className='text-sm text-gray-800 font-medium'>
											Service:{' '}
											<span className='text-gray-500'>
												{form.watch('service') || '—'}
											</span>
										</p>
										<p className='text-sm text-gray-800 font-medium'>
											Date:{' '}
											<span className='text-gray-500'>
												{date?.toLocaleDateString()}
											</span>
										</p>
										<p className='text-sm text-gray-800 font-medium'>
											Time:{' '}
											<span className='text-gray-500'>
												{form.watch('time') || '—'}
											</span>
										</p>
									</div>
								</div>
								<div className=' flex flex-col md:flex-row justify-center items-center gap-4 w-full'>
									<Button
										type='submit'
										className='bg-blue-700 hover:bg-blue-800 max-w-xs text-white w-full h-12'
									>
										<h3>Book</h3>
									</Button>
									<Button
										disabled={isPending}
										variant='outline'
										onClick={() => {
											form.reset();
											setDate(new Date());
											onClose();
										}}
										className='text-gray-500 max-w-xs w-full h-12 hover:bg-gray-100 hover:text-gray-800'
									>
										<h3>Cancel</h3>
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>
			</motion.div>
		</div>
	);
};

export default CreateBookingForm;
