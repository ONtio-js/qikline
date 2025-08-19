'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { adminSchema } from '../../../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { signup } from '@/actions/auth/businessOwner/route';
import { useRouter } from 'next/navigation';
import Logo from '../Logo';

const AdminSignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();
	const [error, setError] = useState<string>('');
	const form = useForm<z.infer<typeof adminSchema>>({
		resolver: zodResolver(adminSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof adminSchema>) => {
		try {
			setError('');
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value);
			});
			const response = await signup(formData);
			if (response?.status) {
				router.push(`/auth/verify?email=${data.email}`);
			} else {
				console.log(response);
				setError(response?.message || 'Failed to sign up');
			}
		} catch (error) {
			setError('An error occurred during sign up');
			console.error('Error signing up:', error);
		}
	};
	return (
		<Form {...form}>
			<div   className='flex  items-center mb-6 md:hidden'>
				<Logo />
			</div>
			<h2 className='text-2xl font-bold mb-2'>
				Create an Account
			</h2>
			<p className='text-sm text-gray-500 mb-8'>
				Enter your details to create an account
			</p>
			{error && (
				<div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
					{error}
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				className='space-y-8'
			>
				<div className='space-y-6 w-full'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-base'>
										Full Name
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your full name'
											{...field}
											className='w-full h-12 rounded-md'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-base'>
										Email Address
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your email'
											{...field}
											className='w-full h-12 rounded-md'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-base'>
										Phone Number
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter your phone number'
											{...field}
											className='w-full h-12 rounded-md'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-base'>
										Create Password
									</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												placeholder='Password'
												{...field}
												className='w-full h-12 rounded-md pr-10'
												type={
													showPassword
														? 'text'
														: 'password'
												}
												autoComplete='off'
											/>
											<button
												type='button'
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
												className='absolute right-3 top-1/2 -translate-y-1/2'
											>
												{showPassword ? (
													<EyeOff className='h-6 w-6 text-gray-400' />
												) : (
													<Eye className='h-6 w-6 text-gray-400' />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-base'>
										Confirm Password
									</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												placeholder='Confirm Password'
												{...field}
												className='w-full h-12 rounded-md pr-10'
												type={
													showConfirmPassword
														? 'text'
														: 'password'
												}
												autoComplete='off'
											/>
											<button
												type='button'
												onClick={() =>
													setShowConfirmPassword(
														!showConfirmPassword
													)
												}
												className='absolute right-3 top-1/2 -translate-y-1/2'
											>
												{showConfirmPassword ? (
													<EyeOff className='h-6 w-6 text-gray-400' />
												) : (
													<Eye className='h-6 w-6 text-gray-400' />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<Button
					disabled={
						form.formState.isSubmitting || !form.formState.isValid
					}
					type='submit'
					className={cn(
						'w-xs h-12 font-semibold text-base rounded-md hover:bg-blue-800 bg-blue-700 text-white'
					)}
				>
					{form.formState.isSubmitting
						? 'Signing Up...'
						: 'Register Business'}
				</Button>
				<p className='text-sm text-gray-500'>
					have an business account already?{' '}
					<Link
						href='/login'
						className='text-blue-700 font-semibold'
					>
						login
					</Link>
				</p>
			</form>
		</Form>
	);
};

export default AdminSignUp;
