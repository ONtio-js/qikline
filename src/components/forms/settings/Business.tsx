import { zodResolver } from '@hookform/resolvers/zod';
import {
	createBusinessSchema,
	updateBusinessSchema,
} from '../../../../schema/schema';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pencil, X, Upload, Trash2 } from 'lucide-react';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	createBusiness,
	updateBusiness,
} from '@/actions/admin/businessMgt/route';
import { toast } from 'sonner';
import { useTransition, useState, useRef, useEffect } from 'react';
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { useBusiness } from '@/hooks/useBusiness';
import { z } from 'zod';
import Image from 'next/image';

export const Business = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<
		Array<{ id: string; image: string; file?: File }>
	>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { businessData } = useBusiness();

	const form = useForm({
		defaultValues: {
			name: '',
			category: undefined as
				| 'SPA'
				| 'HAIR_SALON'
				| 'NAIL_SALON'
				| 'MASSAGE'
				| 'OTHER'
				| undefined,
			description: '',
			address: '',
			city: '',
			state: '',
			country: '',
			phone_number: '',
			email: '',
			website: '',
			banner: [],
			is_active: true,
		},
		resolver: zodResolver(createBusinessSchema),
	});

	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		if (businessData) {
			form.reset({
				name: businessData.name,
				category: businessData.category as
					| 'SPA'
					| 'HAIR_SALON'
					| 'NAIL_SALON'
					| 'MASSAGE'
					| 'OTHER',
				description: businessData.description,
				address: businessData.address,
				city: businessData.city,
				state: businessData.state,
				country: businessData.country,
				phone_number: businessData.phone_number,
				email: businessData.email,
				website: businessData.website,
				banner: businessData.banner,
			});
		}
	}, [businessData, form]);
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const currentCount = uploadedImages.length;
			const maxImages = 3;

			if (currentCount + files.length > maxImages) {
				toast.error(
					`You can only upload up to ${maxImages} images. You currently have ${currentCount} images.`,
					{
						duration: 3000,
						className: 'bg-red-500 text-white',
						icon: <X className='w-4 h-4' />,
						style: {
							backgroundColor: '#f87171',
							color: '#fff',
						},
						position: 'top-right',
					}
				);
				return;
			}

			Array.from(files).forEach((file, index) => {
				const reader = new FileReader();
				reader.onload = (e) => {
					const imageUrl = e.target?.result as string;
					const newImage = {
						id: `temp-${Date.now()}-${index}`,
						image: imageUrl,
						file: file,
					};

					setUploadedImages((prev) => {
						const updatedImages = [...prev, newImage];
						form.setValue('banner', updatedImages);
						return updatedImages;
					});
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeImage = (id: string) => {
		setUploadedImages((prev) => {
			const filtered = prev.filter((img) => img.id !== id);
			form.setValue('banner', filtered);
			return filtered;
		});
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const onSubmit = async (data: z.infer<typeof createBusinessSchema>) => {
		if (
			data.name === '' ||
			data.category === undefined ||
			data.description === '' ||
			data.address === '' ||
			data.city === '' ||
			data.state === '' ||
			data.country === '' ||
			data.phone_number === '' ||
			data.email === ''
		) {
			toast.error('Please fill in all required fields', {
				duration: 3000,
				className: 'bg-red-500 text-white',
				icon: <X className='w-4 h-4' />,
				style: {
					backgroundColor: '#f87171',
					color: '#fff',
					borderRadius: '10px',
					height: '100px',
					width: '400px',
				},
				position: 'top-right',
			});
			return;
		}
		startTransition(async () => {
			try {
				// Create FormData for file upload
				const formData = new FormData();
				formData.append('name', data.name);
				formData.append('category', data.category);
				formData.append('description', data.description);
				formData.append('address', data.address);
				formData.append('city', data.city);
				formData.append('state', data.state);
				formData.append('country', data.country);
				formData.append('phone_number', data.phone_number);
				formData.append('email', data.email);
				formData.append('website', data.website || '');
				formData.append('is_active', 'true');

				// Append banner images
				uploadedImages.forEach((image) => {
					if (image.file) {
						formData.append(`banner`, image.file);
					}
				});

				const response = await createBusiness(formData);

				if (response.status) {
					toast.success(response.message);
					form.reset();
					setUploadedImages([]);
				} else {
					toast.error(response.message, {
						duration: 3000,
						className: 'bg-red-500 text-white',
						icon: <X className='w-4 h-4' />,
						style: {
							backgroundColor: '#f87171',
							color: '#fff',
							borderRadius: '10px',
							height: '60px',
							width: '300px',
						},
						position: 'top-right',
					});
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	const onUpdate = async (data: z.infer<typeof updateBusinessSchema>) => {
		console.log(data);
		if (businessData) {
			const response = await updateBusiness(data);
			if (response.status) {
				toast.success(response.message);
				form.reset();
				setUploadedImages([]);
			} else {
				toast.error(response.message);
			}
		}
	};
	return (
		<Form {...form}>
			<div className='p-4 px-8 border border-gray-200 rounded-lg max-w-[1000px] mb-10'>
				<div className='flex items-center justify-between my-6'>
					<h4 className='text-lg font-semibold text-gray-800'>
						Business Information
					</h4>

					<Button
						disabled={!businessData}
						variant='outline'
						className={`${
							isEditing
								? 'text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white'
								: 'text-gray-500 hover:bg-gray-100'
						}`}
						onClick={() => setIsEditing(!isEditing)}
					>
						<Pencil className='w-4 h-4' />
						Edit
					</Button>
				</div>

				<form
					onSubmit={form.handleSubmit(
						businessData ? onUpdate : onSubmit
					)}
				>
					<div className='pt-8 space-y-8 '>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Business Name{' '}
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
								name='category'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Category{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger
													className='h-12 w-full'
													style={{ height: '50px' }}
												>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='SPA'>
														SPA
													</SelectItem>
													<SelectItem value='HAIR_SALON'>
														HAIR_SALON
													</SelectItem>
													<SelectItem value='NAIL_SALON'>
														NAIL_SALON
													</SelectItem>
													<SelectItem value='MASSAGE'>
														MASSAGE
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
						</div>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Description{' '}
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='h-20 resize-none'
											placeholder='Enter description'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Separator className='my-8 bg-gray-200' />
						<h4 className='text-lg font-semibold text-gray-800 mb-10'>
							Address Information
						</h4>
						<div className='space-y-8'>
							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Street Address{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter street address'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8'>
								<FormField
									control={form.control}
									name='city'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												City{' '}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='h-12'
													placeholder='Enter city'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='state'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												State{' '}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='h-12'
													placeholder='Enter state'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='country'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Country{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter country'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Separator className='my-8 bg-gray-200' />
						<h4 className='text-lg font-semibold text-gray-800 mb-10'>
							Contact Information
						</h4>
						<div className='space-y-8'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8'>
								<FormField
									control={form.control}
									name='phone_number'
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
													placeholder='Enter phone number'
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
													placeholder='Enter your email adddress '
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value ?? ''}
												className='h-12'
												placeholder='www.mybusiness.com '
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Separator className='my-8 bg-gray-200' />
						<div className='flex items-center justify-between'>
							<h4 className='text-lg font-semibold text-gray-800 mb-10'>
								Business Images
							</h4>

							{/* Hidden file input */}
							<input
								ref={fileInputRef}
								type='file'
								multiple
								accept='image/*'
								onChange={handleImageUpload}
								className='hidden'
							/>

							{/* Upload button */}
							<div className='flex justify-center mb-6'>
								<Button
									type='button'
									variant='outline'
									onClick={triggerFileInput}
									disabled={uploadedImages.length >= 3}
									className={`flex items-center gap-2 px-6 py-3 border-2 border-dashed transition-colors ${
										uploadedImages.length >= 3
											? 'border-gray-300 text-gray-400 cursor-not-allowed'
											: 'border-blue-700 hover:border-blue-800 hover:bg-blue-50 text-blue-700 hover:text-blue-800'
									}`}
								>
									<Upload className='w-5 h-5' />
									Upload Images ({uploadedImages.length}/3)
								</Button>
							</div>
						</div>

						{/* Image grid */}
						<div className='grid grid-cols-3 gap-4 pb-3'>
							{uploadedImages.length > 0
								? uploadedImages.map((image, index) => (
										<div
											key={image.id}
											className='relative group'
										>
											<Image
												src={image.image}
												alt={`Business Image ${
													index + 1
												}`}
												width={300}
												height={160}
												className='rounded-lg h-40 w-full object-cover'
											/>
											<button
												type='button'
												onClick={() =>
													removeImage(image.id)
												}
												className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
											>
												<Trash2 className='w-4 h-4' />
											</button>
										</div>
								  ))
								: null}

							{/* Show placeholder slots for remaining images */}
							{Array.from({
								length: 3 - uploadedImages.length,
							}).map((_, index) => (
								<div
									key={`placeholder-${index}`}
									className='border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center text-gray-500'
								>
									<div className='text-center'>
										<Upload
											className='w-8 h-8 mx-auto mb-2'
											onClick={triggerFileInput}
										/>
										<p className='text-sm'>
											No images uploaded
										</p>
									</div>
								</div>
							))}
						</div>

						<div className='flex justify-center gap-4 mb-10'>
							<Button
								variant={'outline'}
								className='w-[200px] md:w-xs h-12 text-[16px] text-gray-600 hover:bg-gray-100'
								onClick={() => {
									form.reset();
									setUploadedImages([]);
								}}
							>
								Cancel
							</Button>
							<Button
								className=' w-[200px] md:w-xs h-12 bg-blue-700 text-white text-[16px] hover:bg-blue-800 font-semibold'
								type='submit'
								disabled={form.formState.isSubmitting}
							>
								{isPending
									? businessData
										? 'Saving...'
										: 'Updating...'
									: businessData
									? 'Update Changes'
									: 'Save Changes'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</Form>
	);
};
