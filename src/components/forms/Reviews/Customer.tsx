'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader, Star, X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { reviewSchema } from '../../../../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createReview } from '@/actions/users/route';

const Customer = ({ business_id }: { business_id: string }) => {
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const form = useForm({
		defaultValues: {
			rating: undefined,
			title: '',
			comment: '',
			business_id: business_id,
			email: '',
		},
		resolver: zodResolver(reviewSchema),
	});

	const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
		try {
			setIsSubmitting(true);
			
			const response = await createReview(data);
			if (response.status) {
				toast.success(response.message,{
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
				toast.error(response.message,{
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
			form.reset();
		} catch (error) {
			console.log(error);
			toast.error('Error submitting review. Please try again.',{
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
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'
			>
				<FormField
					control={form.control}
					name='business_id'
					render={({ field }) => (
						<FormItem className='space-y-2'>
							
							<FormControl>
								<Input
									type='hidden'
									{...field}
									
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
						
					)}
				/>
				<FormField
					control={form.control}
					name='rating'
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='text-gray-500'>
								Rating
							</FormLabel>
							<FormControl>
								<div className='flex items-center gap-x-2'>
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className={`w-6 h-6 cursor-pointer transition-colors ${
												field.value &&
												field.value >= star
													? 'text-yellow-500 fill-current'
													: 'text-gray-300 hover:text-yellow-400'
											}`}
											onClick={() => field.onChange(star)}
										/>
									))}
									{field.value && (
										<p className='text-sm text-gray-600 mt-1'>
											Selected rating: {field.value} out
											of 5
										</p>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='space-y-2'>
							<FormLabel className='text-gray-500'>
								Email
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Enter your email' className='h-12 ' />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-500'>
								Title
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter your title'
									className='h-12 '
								/>
							</FormControl>
					
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-500'>
								Comment
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Enter your comment'
									className='min-h-20 resize-none'
								/>
							</FormControl>
						
						</FormItem>
					)}
				/>
				<div className='flex items-center justify-center'>
					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full h-12 max-w-md mx-auto bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{isSubmitting ? <Loader className='w-5 h-5 animate-spin' /> : 'Submit'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Customer;
