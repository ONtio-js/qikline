'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema } from '../../../schema/schema';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { useSearchParams, useRouter } from 'next/navigation';
import { resendOTP, verifyEmail } from '@/actions/auth/businessOwner/route';
import { toast } from 'sonner';
import { CheckCircle, X } from 'lucide-react';

const Verify = () => {
	const email = useSearchParams().get('email');
	const router = useRouter();
	const form = useForm<z.infer<typeof verifySchema>>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			token: '',
			email: email || '',
		},
	});

	const onSubmit = async (data: z.infer<typeof verifySchema>) => {
		try {
			const response = await verifyEmail(data.token, data.email);
			if (response?.status) {
				toast.success('Email verified successfully', {
					duration: 3000,
					className: 'bg-green-50 text-green-700',
					icon: <CheckCircle className='w-4 h-4' />,
					style: {
						backgroundColor: '#10b981',
						color: 'white',
						borderRadius: '10px',
						padding: '10px',
						height: '60px',
					},
					position: 'top-right',
				});
				router.push('/login');
			} else {
				toast.error(
					typeof response?.message === 'object'
						? response?.message?.token?.[0]
						: response?.message || 'Failed to verify email',
					{
						duration: 3000,
						className: 'bg-destructive text-destructive-foreground',
						icon: <X className='w-4 h-4' />,
						style: {
							backgroundColor: '#ef4444',
							color: 'white',
							borderRadius: '10px',
							padding: '10px',
							height: '60px',
						},
						position: 'top-right',
					}
				);
			}
		} catch (error) {
			console.log(error);
		}
		console.log(data);
	};

	const handleOTPChange = (value: string) => {
		form.setValue('token', value, { shouldValidate: true });
	};

	const handleResendOTP = async () => {
		const response = await resendOTP(form.getValues('email'));
		if (response?.status) {
			toast.success(response?.message || 'OTP sent successfully', {
				duration: 3000,
				icon: <CheckCircle className='w-4 h-4' />,
				position: 'top-right',
				className: 'bg-green-500 text-white',
				style: {
					backgroundColor: '#10b981',
					color: 'white',
					borderRadius: '10px',
					padding: '10px',
					height: '60px',
				},
			});
		} else {
			toast.error(response?.message || 'Failed to send OTP', {
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
		<div className='flex flex-col items-center justify-center h-screen gap-y-5 '>
			<div>
				<h2 className='text-2xl font-bold text-center mb-4 capitalize'>
					only one more step remaining
				</h2>
				<p className='text-gray-500 text-center mb-4 px-10 md:px-0'>
					A code has been sent to your email. Please enter it below to
					verify your account.
				</p>
			</div>
			<form
				className='flex flex-col items-center justify-center gap-y-10'
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
			>
				<InputOTPGroup className='w-full md:w-auto '>
					<InputOTP
						maxLength={6}
						className='mb-4'
						value={form.watch('token')}
						onChange={handleOTPChange}
						pattern='[0-9]*'
					>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTP>
				</InputOTPGroup>
				<input
					type='email'
					{...form.register('email')}
					className='hidden'
					value={form.getValues('email')}
				/>
				<Button
					disabled={
						form.formState.isSubmitting || !form.formState.isValid
					}
					type='submit'
					className='w-xs h-12 bg-blue-700 text-white hover:bg-blue-800 text-lg font-semibold rounded-md'
				>
					Verify & Continue
				</Button>
			</form>
			<p className='text-gray-500 text-center mt-5 cursor-pointer'>
				Didn&apos;t receive the code?{' '}
				<span
					className='text-blue-700 font-medium'
					onClick={handleResendOTP}
				>
					Resend
				</span>
			</p>
		</div>
	);
};

export default Verify;
