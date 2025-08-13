'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../../../schema/schema';
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
import Link from 'next/link';
import { sendRequestPassword } from '@/actions/auth/businessOwner/route';
import { toast } from 'sonner';

const ForgotPassword = () => {
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
		const formData = new FormData();
		formData.append('email', data.email);
		try {
			const response = await sendRequestPassword(formData);
			if (response?.status) {
				form.reset();
				toast.success(typeof response?.message === 'object' ? response?.message?.email?.[0] : response?.message || 'Reset link sent successfully', {
					duration: 3000,
					className: 'bg-green-50 text-green-700',
					icon: '🎉',
					position: 'top-right',
				});
			} else {
				console.log(response);
				toast.error(typeof response?.message === 'object' ? response?.message?.email?.[0] : response?.message || 'Failed to send reset link', {
					duration: 3000,
					className: 'bg-destructive text-destructive-foreground',
					icon: '🚨',
					position: 'top-right',
				});
			}
		} catch {
			toast.error('An error occurred while sending the reset link', {
				duration: 3000,
				className: 'bg-destructive text-destructive-foreground',
				icon: '🚨',
				position: 'top-right',
			});
		}
	};
	return (
		<div className='w-full px-10 md:px-0'>
			<h2 className='text-2xl font-semibold mb-2 text-center capitalize'>
				We&apos;ve got your back!
			</h2>
			<p className=' text-gray-500 mb-8 text-center text-base font-medium'>
				Forgot your password? Simply enter your email, and we&apos;ll send
				you a secure link to reset it. No worries!
			</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				className='space-y-8 w-full'
			>
				<Form {...form}>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-base'>
									Email Address{' '}
									<span className='text-gray-500'>
										(registered email)
									</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter your registered email'
										{...field}
										className='w-full h-12 rounded-md'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormMessage />
					<div className='flex justify-center'>
						<Button
							disabled={
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
							type='submit'
							className='w-xs h-12 font-semibold text-base rounded-md hover:bg-blue-800 bg-blue-700 text-white'
						>
							Send Reset Link
						</Button>
					</div>
				</Form>
				<p className='text-sm text-gray-500 text-center'>
					Remember your password?{' '}
					<Link
						href='/login'
						className='text-blue-700 font-semibold'
					>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default ForgotPassword;
