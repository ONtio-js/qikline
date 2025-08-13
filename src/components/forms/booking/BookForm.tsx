'use client';
import React, { useTransition } from 'react';
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
import { CalendarIcon, Clock } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const BookForm = () => {
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
	const [isPending, startTransition] = useTransition();
	const onSubmit = (data: z.infer<typeof bookFormSchema>) => {
		startTransition(() => {
			console.log(data);
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
											<SelectValue placeholder='Select a service' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='service1'>
												Service 1
											</SelectItem>
											<SelectItem value='service2'>
												Service 2
											</SelectItem>
											<SelectItem value='service3'>
												Service 3
											</SelectItem>
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
											type='time'
											{...field}
											placeholder='Select a time'
											className='w-full h-[50px] pr-10 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden'
											ref={timeInputRef}
										/>
										<Clock
											className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600'
											onClick={() =>
												timeInputRef.current?.showPicker?.() ||
												timeInputRef.current?.click()
											}
										/>
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
						className='w-48 h-[50px] mt-2 bg-blue-700 text-white hover:bg-blue-800'
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
