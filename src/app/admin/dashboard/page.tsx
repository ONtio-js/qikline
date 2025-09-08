'use client';
import React, { useEffect, useState } from 'react';
import {
	Calendar,
	Users,
	MoreVertical,
	CircleCheck,
	Trash,
} from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { MdAddCard } from 'react-icons/md';
import { Separator } from '@/components/ui/separator';
import BusinessSetupModal from '@/components/admin/BusinessSetupModal';
import { motion } from 'framer-motion';
import { useBusiness } from '@/hooks/useBusiness';
import Pending from '@/components/status/Pending';
import BookingCard from '@/components/admin/BookingCard';
import { useRouter } from 'next/navigation';
import { getAllBookings } from '@/actions/admin/Booking/route';
import CreateBookingForm from '@/components/forms/booking/CreateBookingForm';
import Completed from '@/components/status/completed';
import Failed from '@/components/status/Failed';
import Approved from '@/components/status/Approved';
interface Booking {
	id: number;
	business_name: string;
	customer_email: string;
	date: string;
	time: string;
	status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
	status_display: string;
	created_at: string;
	updated_at: string;
	service: {
		id: number;
		name: string;
		description: string;
		price: string;
		duration: number;
	};
}

const Page = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const { businessData, isLoading, isInitialized } = useBusiness();
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [page] = useState(1);
	const [limit] = useState(10);
	useEffect(() => {
		const fetchBookings = async () => {
			const response = await getAllBookings(page, limit);
			if (
				response &&
				typeof response === 'object' &&
				'data' in response
			) {
				// Transform API data to match Booking interface
				const transformedBookings = response.data.map(
					(item: {
						id: number;
						service:
							| string
							| {
									id: number;
									name: string;
									description: string;
									price: string;
									duration: number;
							  };
						name: string;
						phone_number: string;
						email: string;
						date: string;
						time: string;
						status: string;
						created_at: string;
						updated_at: string;
						business_name?: string;
						customer_email?: string;
						status_display?: string;
						service_id?: number;
						service_name?: string;
						service_description?: string;
						service_price?: string;
						service_duration?: number;
					}) => ({
						id: item.id,
						business_name: item.business_name || 'Unknown Business',
						customer_email:
							item.email || item.customer_email || 'No Email',
						date: item.date,
						time: item.time,
						status: item.status as
							| 'PENDING'
							| 'COMPLETED'
							| 'FAILED'
							| 'CANCELLED',
						status_display: item.status_display || item.status,
						created_at: item.created_at,
						updated_at: item.updated_at,
						service: {
							id:
								item.service_id ||
								(typeof item.service === 'object'
									? item.service.id
									: 0),
							name:
								item.service_name ||
								(typeof item.service === 'object'
									? item.service.name
									: 'Unknown Service'),
							description:
								item.service_description ||
								(typeof item.service === 'object'
									? item.service.description
									: ''),
							price:
								item.service_price ||
								(typeof item.service === 'object'
									? item.service.price
									: '0'),
							duration:
								item.service_duration ||
								(typeof item.service === 'object'
									? item.service.duration
									: 0),
						},
					})
				);
				setBookings(transformedBookings);
			}
		};
		fetchBookings();
	}, [page, limit]);

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700'></div>
			</div>
		);
	}

	if (!businessData && !isOpen && isInitialized) {
		return <BusinessSetupModal onClose={() => setIsOpen(true)} />;
	}

	return (
		<>
			<CreateBookingForm
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
			<div className=''>
				<div className='flex items-center justify-between p-6 pb-0 md:pb-6'>
					<div className='space-y-2 w-xs'>
						<h4 className='text-2xl font-bold'>Dashboard</h4>
						<p className='text-gray-500'>
							Manage your bookings and business operations
						</p>
					</div>
					<div className='flex gap-2'>
						<Button
							className='bg-blue-700 text-white hover:bg-blue-800 w-xs h-12 hidden md:flex'
							size='lg'
							onClick={() => setIsOpen(true)}
						>
							<MdAddCard size={24} />
							<span>New Booking</span>
						</Button>
					</div>
				</div>
				<div className='overflow-x-auto no-scrollbar'>
					<div className='grid grid-cols-4 gap-4 md:mt-6 border-b border-gray-200 pb-10 p-6 min-w-[1200px]'>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200 '>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Total Bookings
								</h5>
								<Calendar
									size={30}
									className='text-blue-700'
								/>
							</div>

							<div>
								<p className='text-lg font-semibold'>
									{bookings.length}
								</p>
								<p className='text-gray-500'>
									+8% from last week
								</p>
							</div>
						</div>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Total Revenue
								</h5>
								<Image
									src='/admin/icons/waterfall.svg'
									alt='money'
									width={30}
									height={30}
									className='text-gray-400'
								/>
							</div>

							<div>
								<p className='text-lg font-semibold'>
									N 100,000
								</p>
								<p className='text-gray-500'>
									+32.5% from last week
								</p>
							</div>
						</div>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Active customers
								</h5>
								<Image
									src='/admin/icons/user-group.svg'
									alt='staff'
									width={30}
									height={30}
									className='text-gray-400'
								/>
							</div>
							<div>
								<p className='text-lg font-semibold'>24</p>
								<p className='text-gray-500'>
									-20% from last week
								</p>
							</div>
						</div>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Average wait time
								</h5>
								<Users
									size={30}
									className='text-blue-700'
								/>
							</div>
							<div>
								<p className='text-lg font-semibold'>14 mins</p>
								<p className='text-gray-500'>
									-20% from last week
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='p-6 '>
				<h3 className='text-xl font-semibold text-gray-800'>
					Bookings
				</h3>
				<div className='mt-6 '>
					<Tabs
						defaultValue='pending'
						className='w-full  '
					>
						<div className='flex flex-col-reverse gap-y-2  md:flex-row md:items-center gap-x-4 w-full justify-between'>
							<TabsList className='h-13 bg-gray-100 px-2 rounded-md w-full md:w-[500px]'>
								<TabsTrigger
									value='pending'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Pending
								</TabsTrigger>
								<TabsTrigger
									value='completed'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Completed
								</TabsTrigger>
								<TabsTrigger
									value='cancelled'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Cancelled
								</TabsTrigger>
							</TabsList>
							<div className='flex items-center gap-x-4'>
								<Button
									variant='outline'
									className='bg-white h-12 text-gray-800'
								>
									<Calendar
										size={24}
										className='text-gray-400'
									/>
									Filter by date
								</Button>
							</div>
						</div>
						<TabsContent
							value='pending'
							className=''
						>
							<div className='flex flex-col md:hidden gap-y-5 '>
								{bookings
									?.filter(
										(booking: Booking) =>
											booking.status === 'PENDING'
									)
									.map((booking: Booking, index: number) => (
										<BookingCard
											key={index}
											id={booking.id}
											business_name={
												booking.business_name
											}
											customer_email={
												booking.customer_email
											}
											date={booking.date}
											time={booking.time}
											status={booking.status}
											status_display={
												booking.status_display
											}
											service={booking.service}
										/>
									))}
							</div>
							<Table className='hidden md:table mt-6 pl-6 min-w-full w-full'>
								<TableHeader className='bg-gray-100 py-2  h-12'>
									<TableHead className='pl-12'>S/N</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Service</TableHead>
									<TableHead>Service Duration </TableHead>

									<TableHead>Action</TableHead>
								</TableHeader>
								<TableBody className='space-y-2 '>
									{bookings?.map(
										(booking: Booking, index: number) => (
											<TableRow
												className='h-12 mt-4'
												key={booking.id}
											>
												<TableCell className='pl-12'>
													{index + 1}
												</TableCell>
												<TableCell className='font-medium flex items-center gap-x-3 '>
													<Avatar className='w-10 h-10'>
														<AvatarFallback>
															{booking.customer_email
																.charAt(0)
																.toUpperCase()}
														</AvatarFallback>
													</Avatar>
													<div className='flex flex-col gap-y-1'>
														<p className='text-base font-medium'>
															{
																booking.customer_email
															}
														</p>
													</div>
												</TableCell>
												<TableCell>
													{booking.status ===
													'PENDING' ? (
														<Pending />
													) : booking.status ===
													  'COMPLETED' ? (
														<Completed />
													) : booking.status ===
													  'CANCELLED' ? (
														<Failed />
													) : (
														<Approved />
													)}
												</TableCell>
												<TableCell>
													{booking.time}
												</TableCell>
												<TableCell>
													{' '}
													<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
														{booking.service.name}
													</span>
												</TableCell>
												<TableCell>
													{booking.service.duration}{' '}
													mins
												</TableCell>
												<TableCell className=''>
													<DropdownMenu>
														{' '}
														<DropdownMenuTrigger>
															<MoreVertical
																size={24}
																className='text-gray-700 rotate-90 group-hover:text-gray-800 cursor-pointer'
															/>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															side='bottom'
															align='end'
														>
															<DropdownMenuItem className='flex items-center gap-x-2 text-red-500'>
																<Trash
																	size={24}
																	className='text-red-500'
																/>
																Cancel
															</DropdownMenuItem>
															<DropdownMenuItem className='flex items-center gap-x-2 text-green-500'>
																<CircleCheck
																	size={24}
																	className='text-green-500'
																/>
																Complete
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value='completed'>
							<div className='flex flex-col md:hidden gap-y-5'>
								{bookings
									?.filter(
										(booking: Booking) =>
											booking.status === 'COMPLETED'
									)
									.map((booking: Booking, index: number) => (
										<BookingCard
											key={index}
											id={booking.id}
											business_name={booking.business_name}
											customer_email={booking.customer_email}
											date={booking.date}
											time={booking.time}
											status={booking.status}
											status_display={booking.status_display}
											service={{
												id: booking.service.id,
												name: booking.service.name,
												description:
													booking.service.description,
												price: booking.service.price,
												duration: booking.service.duration,
											}}
										/>
									))}
							</div>
							
							<Table className='hidden md:table mt-6 pl-6 min-w-full '>
								<TableHeader className='bg-gray-100 py-2  h-12'>
									<TableRow>
										<TableHead className='pl-12'>
											S/N
										</TableHead>
										<TableHead>Client</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Service</TableHead>
										<TableHead>Service Duration </TableHead>

										<TableHead>Action</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className='space-y-2 '>
									{bookings
										?.filter(
											(booking: Booking) =>
												booking.status === 'COMPLETED'
										)
										.map(
											(
												booking: Booking,
												index: number
											) => (
												<TableRow
													className='h-12 mt-4'
													key={booking.id}
												>
													<TableCell className='pl-12'>
														{index + 1}
													</TableCell>
													<TableCell className='font-medium flex items-center gap-x-3 '>
														<Avatar className='w-10 h-10'>
															<AvatarImage
																src={
																	booking.customer_email
																}
															/>
															<AvatarFallback>
																{booking.customer_email
																	.charAt(0)
																	.toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<div className='flex flex-col gap-y-1'>
															<p className='text-base font-medium'>
																{
																	booking.customer_email
																}
															</p>
														</div>
													</TableCell>
													<TableCell>
														{booking.status ===
														'PENDING' ? (
															<Pending />
														) : booking.status ===
														  'COMPLETED' ? (
															<Completed />
														) : booking.status ===
														  'CANCELLED' ? (
															<Failed />
														) : (
															<Approved />
														)}
													</TableCell>
													<TableCell>
														{booking.date} at{' '}
														{booking.time}
													</TableCell>
													<TableCell>
														{' '}
														<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
															{
																booking.service
																	.name
															}
														</span>
													</TableCell>
													<TableCell>
														{
															booking.service
																.duration
														}{' '}
														mins
													</TableCell>
													<TableCell className=''>
														<DropdownMenu>
															{' '}
															<DropdownMenuTrigger>
																<MoreVertical
																	size={24}
																	className='text-gray-700 rotate-90 group-hover:text-gray-800 cursor-pointer'
																/>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																side='bottom'
																align='end'
															>
																<DropdownMenuItem className='flex items-center gap-x-2 text-red-500'>
																	<Trash
																		size={
																			24
																		}
																		className='text-red-500'
																	/>
																	Cancel
																</DropdownMenuItem>
																<DropdownMenuItem className='flex items-center gap-x-2 text-green-500'>
																	<CircleCheck
																		size={
																			24
																		}
																		className='text-green-500'
																	/>
																	Complete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											)
										)}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value='cancelled'>
							<div className='flex flex-col md:hidden gap-y-5'>
								{bookings
									?.filter(
										(booking: Booking) =>
											booking.status === 'CANCELLED'
									)
									.map((booking: Booking) => (
										<BookingCard
											key={booking.id}
											id={booking.id}
											business_name={
												booking.business_name
											}
											customer_email={
												booking.customer_email
											}
											date={booking.date}
											time={booking.time}
											status={booking.status}
											status_display={
												booking.status_display
											}
											service={{
												id: booking.service.id,
												name: booking.service.name,
												description:
													booking.service.description,
												price: booking.service.price,
												duration:
													booking.service.duration,
											}}
										/>
									))}
							</div>
							<Table className='hidden md:table mt-6 pl-6 min-w-full w-full'>
								<TableHeader className='bg-gray-100 py-2  h-12'>
									<TableRow>
										<TableHead className='pl-12'>
											S/N
										</TableHead>
										<TableHead>Client</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Service</TableHead>
										<TableHead>Service Duration </TableHead>

										<TableHead>Action</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className='space-y-2 '>
									{bookings
										?.filter(
											(booking: Booking) =>
												booking.status === 'CANCELLED'
										)
										.map(
											(
												booking: Booking,
												index: number
											) => (
												<TableRow
													className='h-12 mt-4'
													key={booking.id}
												>
													<TableCell className='pl-12'>
														{index + 1}
													</TableCell>
													<TableCell className='font-medium flex items-center gap-x-3 '>
														<Avatar className='w-10 h-10'>
															<AvatarImage
																src={
																	booking.customer_email
																}
															/>
															<AvatarFallback>
																{booking.customer_email
																	.charAt(0)
																	.toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<div className='flex flex-col gap-y-1'>
															<p className='text-base font-medium'>
																{
																	booking.customer_email
																}
															</p>
														</div>
													</TableCell>
													<TableCell>
														{booking.status ===
														'PENDING' ? (
															<Pending />
														) : booking.status ===
														  'COMPLETED' ? (
															<Completed />
														) : booking.status ===
														  'CANCELLED' ? (
															<Failed />
														) : (
															<Approved />
														)}
													</TableCell>
													<TableCell>
														{booking.time}
													</TableCell>
													<TableCell>
														{' '}
														<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
															{
																booking.service
																	.name
															}
														</span>
													</TableCell>
													<TableCell>
														{
															booking.service
																.duration
														}{' '}
														mins
													</TableCell>
													<TableCell className=''>
														<DropdownMenu>
															{' '}
															<DropdownMenuTrigger>
																<MoreVertical
																	size={24}
																	className='text-gray-700 rotate-90 group-hover:text-gray-800 cursor-pointer'
																/>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																side='bottom'
																align='end'
															>
																<DropdownMenuItem className='flex items-center gap-x-2 text-red-500'>
																	<Trash
																		size={
																			24
																		}
																		className='text-red-500'
																	/>
																	Cancel
																</DropdownMenuItem>
																<DropdownMenuItem className='flex items-center gap-x-2 text-green-500'>
																	<CircleCheck
																		size={
																			24
																		}
																		className='text-green-500'
																	/>
																	Complete
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											)
										)}
								</TableBody>
							</Table>
						</TabsContent>
					</Tabs>
					<div className='flex items-center justify-center mt-10'>
						{bookings?.length > 10 && (
							<Button
								onClick={() =>
									router.push('/admin/dashboard/bookings')
								}
								className='bg-transparent font-medium text-lg text-gray-800 hover:bg-gray-100 w-xs border border-gray-200 h-12'
							>
								View all bookings
							</Button>
						)}
					</div>
				</div>
			</div>
			<Separator className='my-10' />
			<div className='p-6'>
				<div className='flex items-center justify-between w-full'>
					<div className='space-y-2'>
						<h3 className='text-xl font-semibold text-gray-800 capitalize'>
							Customer satisfaction
						</h3>
						<p className='text-gray-500 max-w-[350px]'>
							Manage your appointments and business operations
						</p>
					</div>
					<div className='flex items-center gap-x-2'>
						<Button
							variant='outline'
							className=' text-lg font-medium h-12'
						>
							View all
						</Button>
					</div>
				</div>
				<div className='flex flex-col gap-y-10 md:flex-row items-start gap-x-10 md:px-6 justify-between w-full mt-10'>
					<div className='w-full md:w-1/2 bg-white p-5 md:p-10 rounded-lg border border-gray-200 space-y-2'>
						<div className='space-y-1'>
							<h3 className='text-lg font-semibold text-gray-800'>
								Bookings
							</h3>
							<p className='text-gray-500'>Bookings by day</p>
						</div>

						<div className='space-y-4 mt-6'>
							<div className='space-y-2'>
								<div className='flex items-center justify-between font-medium'>
									<span>Monday</span>
									<span>10</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<motion.div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '50%' }}
										initial={{ width: '0%' }}
										whileInView={{ width: '50%' }}
										transition={{
											duration: 0.5,
											ease: 'easeInOut',
										}}
										viewport={{
											once: false,
										}}
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between font-medium'>
									<span>Tuesday</span>
									<span>14</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '70%' }}
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between font-medium'>
									<span>Wednesday</span>
									<span>12</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '50%' }}
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between font-medium'>
									<span>Thursday</span>
									<span>16</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '30%' }}
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between font-medium'>
									<span>Friday</span>
									<span>18</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '10%' }}
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between font-medium'>
									<span>Saturday</span>
									<span>17</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '46%' }}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/2 bg-white p-5 md:p-10 rounded-lg border border-gray-200 space-y-2'>
						<div className='space-y-1'>
							<h3 className='text-lg font-semibold text-gray-800'>
								Customer satisfaction Rate
							</h3>
							<p className='text-gray-500'>
								Average rating by day
							</p>
						</div>
						<div className='space-y-4 mt-6'>
							<div className='space-y-3'>
								<div className='flex items-center justify-between font-medium'>
									<div className='flex items-center gap-x-2'>
										<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center	'>
											<span className='text-gray-500'>
												PN
											</span>
										</div>
										<span>John Doe</span>
									</div>
									<span>4.5/5</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<motion.div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '90%' }}
										initial={{ width: '0%' }}
										whileInView={{ width: '90%' }}
										transition={{
											duration: 0.5,
											ease: 'easeInOut',
										}}
										viewport={{
											once: false,
										}}
									/>
								</div>
							</div>
							<div className='space-y-3'>
								<div className='flex items-center justify-between font-medium'>
									<div className='flex items-center gap-x-2'>
										<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center	'>
											<span className='text-gray-500'>
												PN
											</span>
										</div>
										<span>John Doe</span>
									</div>
									<span>2.5/5</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '40%' }}
									/>
								</div>
							</div>
							<div className='space-y-3'>
								<div className='flex items-center justify-between font-medium'>
									<div className='flex items-center gap-x-2'>
										<div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center	'>
											<span className='text-gray-500'>
												PN
											</span>
										</div>
										<span>John Doe</span>
									</div>
									<span>3.5/5</span>
								</div>
								<div className='h-2.5 w-full bg-gray-200 rounded-full'>
									<div
										className='h-full bg-blue-700 rounded-full'
										style={{ width: '70%' }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
