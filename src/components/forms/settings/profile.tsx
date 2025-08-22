'use client';
import React from 'react';
import { Pencil } from 'lucide-react';
import {
	Form,
	FormField,
	FormControl,
	FormLabel,
	FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BusinessOwnerProfile } from '../../../../schema/schema';
const Profilesetting = () => {
	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			role: '',
		},
		resolver: zodResolver(BusinessOwnerProfile),
	});
	return (
		<Form {...form}>
			<div className='p-4 px-2 sm:px-4 md:px-8 border border-gray-200 rounded-lg max-w-[1000px] mb-10'>
				<div className='flex items-center justify-between my-6'>
					<h4 className='text-lg font-semibold text-gray-800'>
						Personal Information
					</h4>

					<Button variant={'outline'}>
						<Pencil className='w-4 h-4' />
						Edit
					</Button>
				</div>

				<form>
					<div className='pt-8  '>
						<div className='space-y-8 '>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Name{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter business name'
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
										<FormLabel>
											Email Address{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter email address'
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
										<FormLabel>
											Phone Number{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter Phone Number'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='role'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Role{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter your Role'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Separator className=' bg-gray-200 mt-8' />
						<div className='flex flex-col md:flex-row gap-4 mt-6 w-full items-center justify-center'>
							<Button className='bg-blue-700 hover:bg-blue-800 max-w-xs h-12 w-full font-medium'>
								Save Changes
							</Button>
							<Button
								variant={'outline'}
								className='max-w-xs w-full h-12 font-medium'
							>
								Cancel
							</Button>
						</div>
						<div className='py-4'>
							<h3 className=''>Member since 12th May,2025</h3>
						</div>
					</div>
				</form>
			</div>
		</Form>
	);
};

export default Profilesetting;
