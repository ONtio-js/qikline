import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, X } from 'lucide-react';
import React, { useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createBusinessServiceSchema } from '../../../../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { z } from 'zod';
import {
	createBusinessService,
	updateBusinessService,
} from '@/actions/admin/businessService/route';
import { getAccessToken } from '@/utils/token';
import { useBusiness } from '@/hooks/useBusiness';
import { toast } from 'sonner';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const Add = ({
	open,
	service,
	edit,
	setOpen,
}: {
	open: boolean;
	service?: {
		id: string;
		name: string;
		description: string;
		price: number;
		duration: number;
		category: string;
		is_active: boolean;
	};
	edit?: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { fetchBusinessData } = useBusiness();
	const form = useForm<z.infer<typeof createBusinessServiceSchema>>({
		defaultValues: {
			name: '',
			description: '',
			price: '',
			duration: 1,
			category: 'HAIRCUT',
			is_active: true,
		},
		resolver: zodResolver(createBusinessServiceSchema),
	});

	// Reset form when edit mode or service changes
	useEffect(() => {
		if (edit && service) {
			form.reset({
				name: service.name || '',
				description: service.description || '',
				price: service.price?.toString() || '',
				duration: service.duration || 1,
				category:
					(service.category as z.infer<
						typeof createBusinessServiceSchema
					>['category']) || 'HAIRCUT',
				is_active: service.is_active ?? true,
			});
		} else if (!edit) {
			form.reset({
				name: '',
				description: '',
				price: '',
				duration: 1,
				category: 'HAIRCUT',
				is_active: true,
			});
		}
	}, [edit, service, form]);

	const [isPending, startTransition] = useTransition();
	const onUpdate = async (
		data: z.infer<typeof createBusinessServiceSchema>
	) => {
		const token = getAccessToken();
		startTransition(async () => {
			const response = await updateBusinessService(
				token || '',
				service?.id || '',
				{
					...data,
					price: Number(data.price),
					duration: Number(data.duration),
				}
			);
			if (response.status) {
				toast.success(response.message, {
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
				toast.error(response.message, {
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
			setOpen(false);
			fetchBusinessData?.();
		});
	};
	const onSubmit = async (
		data: z.infer<typeof createBusinessServiceSchema>
	) => {
		const token = getAccessToken();

		startTransition(async () => {
			const response = await createBusinessService(token || '', data);
			if (response.status) {
				toast.success(response.message, {
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
				toast.error(response.message, {
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
			setOpen(false);
			fetchBusinessData?.();
		});
	};

	if (!open) return null;

	return (
		<div
			onClick={(e) => {
				setOpen(false);
				e.stopPropagation();
			}}
			className='fixed backdrop-blur top-0 left-0 z-50 bg-black/20 h-screen w-screen md:p-4   flex items-end md:items-center justify-center gap-y-2 hover:shadow-md transition-all duration-300 group space-y-4'
		>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial={{
					y: 100,
			
				}}
				whileInView={{
					y: 0,
				}}
				transition={{
					duration: 0.2,
					ease: 'easeIn',
					delay: 0.2,
				}}
				className=' bg-white w-full md:w-[700px] p-6 md:p-10 pt-20 rounded-t-2xl md:rounded-md border h-[90%] md:h-auto border-gray-200 flex flex-col gap-y-2 shadow-md transition-all duration-300 cursor-pointer group space-y-4'
			>
				<div className='flex items-center justify-between'>
					<h2 className='text-gray-800 text-lg font-medium capitalize'>
						{edit ? 'Edit Service' : 'Add new service'}
					</h2>
					<X
						size={24}
						className='text-gray-800 cursor-pointer'
						onClick={() => setOpen(false)}
					/>
				</div>
				<Form {...form}>
					<form
						className='space-y-6'
						onSubmit={form.handleSubmit(edit ? onUpdate : onSubmit)}
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Service Name{' '}
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter service name'
											{...field}
											className='h-12'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter service description'
											{...field}
											className='h-12'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-2 items-center gap-x-5 w-full '>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Price (NGN){' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Enter price'
												{...field}
												className='h-12'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='duration'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Duration (minutes){' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Enter duration'
												{...field}
												value={field.value || ''}
												onChange={(e) => {
													const value =
														e.target.value;
													field.onChange(
														value === ''
															? 0
															: Number(value)
													);
												}}
												className='h-12 w-full'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger
												className='h-12 w-full'
												style={{ height: '50px' }}
											>
												<SelectValue placeholder='Select category' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='HAIRCUT'>
													Haircut
												</SelectItem>
												<SelectItem value='COLORING'>
													Coloring
												</SelectItem>
												<SelectItem value='FACIAL'>
													Facial
												</SelectItem>
												<SelectItem value='MASSAGE'>
													Massage
												</SelectItem>
												<SelectItem value='MANICURE'>
													Manicure
												</SelectItem>
												<SelectItem value='PEDICURE'>
													Pedicure
												</SelectItem>
												<SelectItem value='WAXING'>
													Waxing
												</SelectItem>
												<SelectItem value='TREATMENT'>
													Treatment
												</SelectItem>
												<SelectItem value='MAKEUP'>
													Makeup
												</SelectItem>
												<SelectItem value='OTHER'>
													Other
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex flex-col-reverse md:flex-row gap-y-4 md:gap-x-5 items-center justify-center'>
							<Button
								type='button'
								variant={'outline'}
								size={'lg'}
								className='w-xs md:w-[12rem] h-12'
								onClick={() => setOpen(false)}
							>
								{edit ? 'Cancel' : 'Close'}
							</Button>
							<Button
								type='submit'
								className='w-xs md:w-[12rem] h-12 bg-blue-700 hover:bg-blue-800'
								size={'lg'}
								disabled={isPending}
							>
								{isPending ? (
									<Loader2 className='w-6 h-6 animate-spin' />
								) : edit ? (
									'Update Service'
								) : (
									'Add Service'
								)}
							</Button>
						</div>
					</form>
				</Form>
			</motion.div>
		</div>
	);
};

export default Add;
