'use client';
import React from 'react';
import { kycSettingSchema } from '../../../../schema/schema';
import { useForm as useFormHook } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectContent,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const KycSettings = () => {
	const form = useFormHook<z.infer<typeof kycSettingSchema>>({
		resolver: zodResolver(kycSettingSchema),
		defaultValues: {
			kyc_document: '',
			kyc_document_type: undefined,
			kyc_document_number: '',
			kyc_document_expiration_date: '',
			kyc_document_front: '',
			kyc_document_back: '',
			kyc_document_selfie: '',
			kyc_document_status: null,
		},
	});
	const onSubmit = (data: z.infer<typeof kycSettingSchema>) => {
		console.log(data);
	};
	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 max-w-[1000px]  border border-gray-200 rounded-md p-4'
				>
					<FormField
						control={form.control}
						name='kyc_document'
						render={({ field }) => (
							<FormItem>
								<FormLabel>KYC Document</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={field.value || ''}
										className='w-full h-12'
										placeholder='Enter your kyc document'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='kyc_document_type'
						render={({ field }) => (
							<FormItem>
								<FormLabel>KYC Document Type</FormLabel>
								<FormControl>
									<Select
										{...field}
										value={field.value || ''}
									>
										<SelectTrigger
											style={{ height: '50px' }}
											className='w-full h-12 border border-gray-200 rounded-md p-2'
										>
											<SelectValue placeholder='Select a document type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='PASSPORT'>
												PASSPORT
											</SelectItem>
											<SelectItem value='DRIVING_LICENSE'>
												DRIVING LICENSE
											</SelectItem>
											<SelectItem value='NATIONAL_ID'>
												NATIONAL ID
											</SelectItem>
											<SelectItem value='OTHER'>
												OTHER
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='kyc_document_number'
						render={({ field }) => (
							<FormItem>
								<FormLabel>KYC Document Number</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={field.value || ''}
										className='w-full h-12'
										placeholder='Enter your kyc document number'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='kyc_document_expiration_date'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									KYC Document Expiration Date
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={field.value || ''}
										className='w-full h-12'
										placeholder='Enter your kyc document expiration date'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='kyc_document_front'
						render={({ field }) => (
							<FormItem>
								<FormLabel>KYC Document Front</FormLabel>
								<FormControl>
									<Input
										type='file'
										{...field}
										value={field.value || ''}
										className='w-full h-12 border border-gray-200 rounded-md p-2'
										placeholder='Enter your kyc document front'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='kyc_document_back'
						render={({ field }) => (
							<FormItem>
								<FormLabel>KYC Document Back</FormLabel>
								<FormControl>
									<Input
										type='file'
										{...field}
										value={field.value || ''}
										className='w-full h-12 border border-gray-200 rounded-md p-2'
										placeholder='Enter your kyc document back'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='kyc_document_selfie'
						render={({ field }) => (
							<FormItem>
								<FormLabel>KYC Document Selfie</FormLabel>
								<FormControl>
									<Input
										type='file'
										{...field}
										value={field.value || ''}
										className='w-full h-12 border border-gray-200 rounded-md p-2'
										placeholder='Enter your kyc document selfie'
									/>
								</FormControl>
							</FormItem>
						)}
					/>
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
				</form>
			</Form>
		</div>
	);
};

export default KycSettings;
