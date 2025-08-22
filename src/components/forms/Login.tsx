'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/actions/auth/businessOwner/route';
import { toast } from 'sonner';
import { EyeIcon, X } from 'lucide-react';
import { debugStorage, setTokens } from '@/utils/token';
import Logo from '../Logo';

const Login = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		try {
			console.log('Starting login process...');
			const response = await login(data.email, data.password);

			if (response.status) {
				console.log('Login successful, checking storage...');
				// Debug storage after login
				setTimeout(() => {
					debugStorage();
				}, 100);

				form.reset();
				// Get the redirect URL from search params, default to admin dashboard
				const redirectUrl =
					searchParams.get('redirect') || '/admin/dashboard';
				router.push(redirectUrl);
				setTokens(
					response.data?.access_token || '',
					response.data?.refresh_token || ''
				);
			} else {
				console.log('Login failed:', response.message);
				toast.error(
					typeof response.message === 'object'
						? response.message?.email?.[0]
						: response.message || 'Login failed',
					{
						duration: 3000,
						icon: <X className='w-4 h-4' />,
						position: 'top-right',
						className: 'bg-red-500 text-white',
						style: {
							backgroundColor: '#ef4444',
							color: 'white',
							borderRadius: '10px',
							padding: '10px',
							height: '60px',
						},
					}
				);
			}
		} catch (error) {
			console.error('Login error:', error);
			toast.error('An error occurred during login', {
				duration: 3000,
				icon: <X className='w-4 h-4' />,
				position: 'top-right',
				className: 'bg-red-500 text-white',
				style: {
					backgroundColor: '#ef4444',
					color: 'white',
					borderRadius: '10px',
					padding: '10px',
					height: '60px',
				},
			});
		}
	};

	return (
		<Form {...form}>
			<div className='flex items-center  mb-6 md:hidden'>
				<Logo />
			</div>
			<h2 className='text-2xl font-bold mb-2'>Login to your account</h2>
			<p className='text-sm text-gray-500 mb-8'>
				Enter your details to login to your account
			</p>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<div className='space-y-6 w-full'>
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
					</div>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-base'>
										Password
									</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												placeholder='Enter your password'
												{...field}
												className='w-full h-12 rounded-md'
												type={
													showPassword
														? 'text'
														: 'password'
												}
												autoComplete='off'
											/>
											<EyeIcon
												onClick={() =>
													setShowPassword(
														!showPassword
													)
												}
												className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer'
											/>
										</div>
									</FormControl>
									<FormMessage />
									<Link
										href='/auth/forgot-password'
										className='text-sm text-blue-700 font-semibold'
									>
										Forgot Password?
									</Link>
								</FormItem>
							)}
						/>
					</div>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-x-2'>
							<Checkbox id='remember' />
							<Label htmlFor='remember'>Remember me</Label>
						</div>
					</div>
				</div>
				<Button
					disabled={
						form.formState.isSubmitting || !form.formState.isValid
					}
					type='submit'
					className={cn(
						'w-xs h-12 font-semibold text-base rounded-md hover:bg-blue-800 bg-blue-700 text-white '
					)}
				>
					{form.formState.isSubmitting
						? 'Logging in...'
						: 'Login to Dashboard'}
				</Button>
				<p className='text-sm text-gray-500'>
					Don&apos;t have an account?{' '}
					<Link
						href='/admin'
						className='text-blue-700 font-semibold'
					>
						Sign up
					</Link>
				</p>
			</form>
		</Form>
	);
};

export default Login;
