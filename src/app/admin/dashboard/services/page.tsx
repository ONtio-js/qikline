'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
	CheckCircle,
	CircleCheck,
	CircleX,
	Clock,
	MoreVertical,
	Pencil,
	Plus,
	Trash,
	X,
} from 'lucide-react';
import SearchBox from '@/components/admin/searchBox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NairaSign from '@/components/ui/naira-sign';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Add from '@/components/forms/services/Add';
import {
	deleteBusinessService,
	updateBusinessService,
} from '@/actions/admin/businessService/route';
import { toast } from 'sonner';
import { FormatDateDuration } from '@/lib/utils';
import { useBusiness } from '@/hooks/useBusiness';
import { getAccessToken } from '@/utils/token';
import EmptyState from '@/components/status/EmptyState';
type Service = {
	id: string;
	name: string;
	description: string;
	price: number;
	duration: number;
	category: string;
	category_display: string;
	is_active: boolean;
	created_at?: string;
	updated_at?: string;
};
const Page = () => {
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [service, setService] = useState<Service | undefined>(undefined);
	const [services, setServices] = useState<Service[]>([]);
	const { businessData, fetchBusinessData } = useBusiness();
	const [isPending, startTransition] = useTransition();
	const [serviceId, setServiceId] = useState<string | undefined>(undefined);
	useEffect(() => {
		if (businessData) {
			setServices(businessData.services || []);
		}
	}, [businessData]);
	const handleOpenModal = (
		isEdit: boolean = false,
		selectedService?: Service
	) => {
		setEdit(isEdit);
		setService(selectedService);
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setEdit(false);
		setService(undefined);
	};
	const handleDeleteService = (serviceId: string) => {
		setServiceId(serviceId);
		startTransition(async () => {
			const response = await deleteBusinessService(
				getAccessToken() || '',
				serviceId
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
				await fetchBusinessData?.();
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
		});
	};

	const deActivateService = async (serviceId: string, service: Service) => {
		const token = getAccessToken();
		const response = await updateBusinessService(token || '', serviceId, {
			name: service.name,
			description: service.description,
			price: Number(service.price),
			duration: service.duration,
			category: service.category,
			is_active: false,
		});
		console.log(response);
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
			// Refresh business data to update the UI
			await fetchBusinessData?.();
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
	};

	const reActivateService = async (serviceId: string, service: Service) => {
		const token = getAccessToken();
		const response = await updateBusinessService(token || '', serviceId, {
			name: service.name,
			description: service.description,
			price: Number(service.price),
			duration: service.duration,
			category: service.category,
			is_active: true,
		});
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
			// Refresh business data to update the UI
			await fetchBusinessData?.();
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
	};

	return (
		<>
			{open && (
				<Add
					open={open}
					setOpen={handleCloseModal}
					edit={edit}
					service={service}
				/>
			)}
			<div className='flex flex-col md:flex-row md:items-center justify-between mt-6 px-6 gap-y-4'>
				<div className='flex flex-col gap-y-1'>
					<h2 className=' text-xl font-semibold text-gray-800 capitalize'>
						Services Management
					</h2>
					<p className='text-gray-500 text-base max-w-[350px] '>
						Manage your business services,prices and availability
					</p>
				</div>
				<div className='flex items-center gap-x-2 w-full md:w-auto justify-end'>
					<Button
						variant='outline'
						className='text-lg font-medium h-12 md:w-xs gap-x-2 bg-blue-700 text-white hover:bg-blue-700 hover:text-white'
						onClick={() => handleOpenModal(false)}
					>
						<Plus size={24} />
						Add Service
					</Button>
				</div>
			</div>
			<div className='p-6'>
				<div className='hidden md:flex items-center gap-x-5 mb-6'>
					<SearchBox placeholder='Search ' />
				</div>

				<h2 className='text-gray-800 text-lg font-medium md:mt-10 mb-4'>
					Services ({services.length})
				</h2>
				<Tabs defaultValue='active'>
					<TabsList className='w-full md:w-[400px] h-12 bg-gray-50 rounded-md'>
						<TabsTrigger
							value='active'
							className='w-full'
						>
							Active services (
							{
								services.filter((service) => service.is_active)
									.length
							}
							)
						</TabsTrigger>
						<TabsTrigger
							value='inactive'
							className='w-full'
						>
							Inactive services (
							{
								services.filter((service) => !service.is_active)
									.length
							}
							)
						</TabsTrigger>
					</TabsList>
					{services.length === 0 && (
						<div className='col-span-full flex justify-center items-center h-full mt-10'>
							<EmptyState
								title='No services recorded yet'
								description='No services recorded yet, list your services to get started'
							/>
						</div>
					)}
					<TabsContent value='active'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
							{services.map(
								(service) =>
									service.is_active && (
										<div
											key={service.id}
											className='relative bg-white p-4 rounded-md border border-gray-200 flex flex-col gap-y-2 hover:shadow-md transition-all duration-300 cursor-pointer group space-y-4 hover:border-blue-500'
										>
											{isPending &&
												serviceId === service.id && (
													<div className='absolute top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center'>
														<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700'></div>
													</div>
												)}
											<div className='flex items-start justify-between'>
												<div>
													<h2 className='text-gray-800 text-lg font-medium'>
														{service.name}
													</h2>
													<p className='text-gray-500 text-sm max-w-[200px] line-clamp-2 '>
														{service.description}
													</p>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger className='bg-gray-100 h-10 w-10 text-gray-800  rounded-full flex items-center justify-center  hover:bg-gray-200 cursor-pointer border border-gray-200 group '>
														<MoreVertical
															size={24}
															className='text-blue-700 group-hover:text-gray-800'
														/>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														side='bottom'
														align='end'
													>
														<DropdownMenuItem
															className='flex items-center gap-x-2 text-blue-500'
															onClick={() =>
																handleOpenModal(
																	true,
																	service
																)
															}
														>
															<Pencil
																size={24}
																className='text-blue-500'
															/>
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															className='flex items-center gap-x-2 text-red-500'
															onClick={() =>
																handleDeleteService(
																	service.id
																)
															}
														>
															<Trash
																size={24}
																className='text-red-500'
															/>
															Delete
														</DropdownMenuItem>
														<DropdownMenuItem
															className='flex items-center gap-x-2 text-amber-500'
															onClick={() =>
																deActivateService(
																	service.id,
																	service
																)
															}
														>
															<CircleX
																className='text-amber-500'
																size={24}
															/>
															Deactivate
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
											<div className='flex items-center gap-x-2 justify-between w-full'>
												<span className='text-blue-800 text-sm font-medium border border-blue-500 rounded-full px-4 py-1'>
													Active
												</span>
												<span className='text-gray-500 text-sm capitalize'>
													Updated{' '}
													{service.updated_at
														? FormatDateDuration(
																service.updated_at
														  )
														: 'N/A'}
												</span>
											</div>
											<div className='flex items-center justify-between'>
												<div className='flex items-center'>
													<span className='text-gray-800 text-lg font-medium'>
														<NairaSign />{' '}
														{service.price}
													</span>
													<span className='text-gray-500 text-sm'>
														/session
													</span>
												</div>
												<div className='flex items-center gap-x-2'>
													<Clock
														size={20}
														className='text-gray-500'
													/>
													<span className='text-gray-500 text-sm'>
														{service.duration} mins
													</span>
												</div>
											</div>
										</div>
									)
							)}
						</div>{' '}
					</TabsContent>
					<TabsContent value='inactive'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
							{services.map(
								(service) =>
									!service.is_active && (
										<div
											key={service.id}
											className='relative bg-white p-4 rounded-md border border-gray-200 flex flex-col gap-y-2 hover:shadow-md transition-all duration-300 cursor-pointer group space-y-4 hover:border-red-500/50 opacity-60'
										>
											{isPending &&
												serviceId === service.id && (
													<div className='absolute top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center'>
														<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-red-500'></div>
													</div>
												)}
											<div className='flex items-center justify-between'>
												<div>
													<h2 className='text-gray-800 text-lg font-medium'>
														{service.name}
													</h2>
													<p className='text-gray-500 text-sm max-w-[200px] line-clamp-2 '>
														{service.description}
													</p>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger className='bg-gray-100 h-10 w-10 text-gray-800  rounded-full flex items-center justify-center  hover:bg-gray-200 cursor-pointer border border-gray-200 group '>
														<MoreVertical
															size={24}
															className='text-gray-400 group-hover:text-gray-800'
														/>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														side='bottom'
														align='end'
													>
														<DropdownMenuItem
															className='flex items-center gap-x-2 text-red-500'
															onClick={() =>
																handleDeleteService(
																	service.id
																)
															}
														>
															<Trash
																size={24}
																className='text-red-500'
															/>
															Delete
														</DropdownMenuItem>
														<DropdownMenuItem
															className='flex items-center gap-x-2 text-green-500'
															onClick={() =>
																reActivateService(
																	service.id,
																	service
																)
															}
														>
															<CircleCheck
																className='text-green-500'
																size={24}
															/>
															Reactivate
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
											<div className='flex items-center gap-x-2'>
												<span className='text-red-500 text-sm font-medium border border-red-500 rounded-full px-4 py-1'>
													Inactive
												</span>
												<span className='text-gray-500 text-sm capitalize'>
													Updated{' '}
													{service.updated_at
														? FormatDateDuration(
																service.updated_at
														  )
														: 'N/A'}
												</span>
											</div>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-x-2'>
													<span className='text-gray-800 text-lg font-medium'>
														<NairaSign />{' '}
														{service.price}
													</span>
												</div>
												<div className='flex items-center gap-x-2'>
													<Clock
														size={20}
														className='text-gray-500'
													/>
													<span className='text-gray-500 text-sm'>
														{service.duration} mins
													</span>
												</div>
											</div>
										</div>
									)
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
};

export default Page;
