'use client';
import React, { useState } from 'react';
import { Calendar, MoreHorizontal, ChevronDown, Users } from 'lucide-react';
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

const Page = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { businessData, isLoading, isInitialized, error, fetchBusinessData } =
		useBusiness();

	console.log('Dashboard - Business Data State:', {
		businessData: businessData ? 'Found' : 'Not found',
		isLoading,
		isInitialized,
		error,
		hasBusiness: !!businessData,
	});

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700'></div>
			</div>
		);
	}

	// Show business setup modal if no business data and not loading
	if (!businessData && !isOpen && isInitialized) {
		return <BusinessSetupModal onClose={() => setIsOpen(true)} />;
	}

	return (
		<>
			<div className=''>
				<div className='flex items-center justify-between p-6'>
					<div className='space-y-2 w-xs'>
						<h4 className='text-2xl font-bold'>Dashboard</h4>
						<p className='text-gray-500'>
							Manage your bookings and business operations
						</p>
						{/* Debug info */}
						<div className='text-xs text-gray-400 mt-2'>
							Status:{' '}
							{isLoading
								? 'Loading'
								: isInitialized
								? 'Initialized'
								: 'Not initialized'}{' '}
							| Business: {businessData ? 'Found' : 'Not found'} |
							Error: {error || 'None'}
						</div>
					</div>
					<div className='flex gap-2'>
						<Button
							onClick={() => {
								console.log('Manual refresh triggered');
								fetchBusinessData();
							}}
							variant='outline'
							size='sm'
							className='text-xs'
						>
							Refresh Data
						</Button>
						<Button
							className='bg-blue-700 text-white hover:bg-blue-800 w-xs h-12 hidden md:flex'
							size='lg'
						>
							<MdAddCard size={24} />
							<span>New Booking</span>
						</Button>
					</div>
				</div>
				<div className='overflow-x-auto no-scrollbar'>
					<div className='grid grid-cols-4 gap-4 mt-6 border-b border-gray-200 pb-10 p-6 min-w-[1200px]'>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200 '>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Total Bookings
								</h5>
								<Calendar
									size={30}
									className='text-gray-400'
								/>
							</div>

							<div>
								<p className='text-lg font-semibold'>1000</p>
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
									className='text-gray-400'
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
						defaultValue='upcoming'
						className='w-full  '
					>
						<div className='flex flex-col-reverse gap-y-2  md:flex-row md:items-center gap-x-4 w-full justify-between'>
							<TabsList className='h-13 bg-gray-100 px-2 rounded-md w-full md:w-[500px]'>
								<TabsTrigger
									value='upcoming'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									upcoming
								</TabsTrigger>
								<TabsTrigger
									value='today'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Today
								</TabsTrigger>
								<TabsTrigger
									value='completed'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Completed
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

								<DropdownMenu>
									<DropdownMenuTrigger>
										<div className='flex items-center gap-x-2 bg-white h-12 text-gray-800 px-5 rounded-md cursor-pointer border border-gray-200'>
											All status{' '}
											<ChevronDown
												size={24}
												className='text-gray-400'
											/>
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side='bottom'
										align='end'
									>
										<DropdownMenuItem>
											View calendar
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<TabsContent value='upcoming'>
							<Table className='mt-6 pl-6 w-full'>
								<TableHeader className='bg-gray-100 py-2  h-12'>
									<TableRow>
										<TableHead className='pl-12'>
											Booking ID
										</TableHead>
										<TableHead>Client</TableHead>
										<TableHead>Service</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Service duration</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Action</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className='space-y-2 '>
									<TableRow className='h-12 mt-4'>
										<TableCell className=' pl-12'>
											1001
										</TableCell>
										<TableCell className='flex items-center gap-x-2'>
											<Avatar className='w-10 h-10'>
												<AvatarImage src='https://github.com/shadcn.png' />
												<AvatarFallback>
													JD
												</AvatarFallback>
											</Avatar>
											John Doe
										</TableCell>
										<TableCell>
											{' '}
											<span className='text-blue-700 border border-blue-700 rounded-full px-2 py-1	'>
												Haircut
											</span>
										</TableCell>
										<TableCell>
											{' '}
											<span className='text-emerald-700 border border-emerald-700 rounded-full px-2 py-1	'>
												progress
											</span>{' '}
										</TableCell>
										<TableCell>50 min</TableCell>
										<TableCell>10:00 AM</TableCell>
										<TableCell className=''>
											<MoreHorizontal size={24} />
										</TableCell>
									</TableRow>
									<TableRow className='h-12 mt-4'>
										<TableCell className=' pl-12'>
											1002
										</TableCell>
										<TableCell className='flex items-center gap-x-2'>
											<Avatar className='w-10 h-10'>
												<AvatarImage src='https://github.com/shadcn.png' />
												<AvatarFallback>
													JF
												</AvatarFallback>
											</Avatar>
											Jane Fray
										</TableCell>
										<TableCell>
											{' '}
											<span className='text-blue-700 border border-blue-700 rounded-full px-2 py-1	'>
												{' '}
												Tinting
											</span>
										</TableCell>
										<TableCell>
											{' '}
											<span className='text-red-700 border border-red-700 rounded-full px-2 py-1	'>
												Pending
											</span>
										</TableCell>
										<TableCell>30 min</TableCell>
										<TableCell>10:00 AM</TableCell>
										<TableCell className=''>
											<MoreHorizontal size={24} />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value='today'>
							Change your password here.
						</TabsContent>
						<TabsContent value='completed'>
							Change your password here.
						</TabsContent>
					</Tabs>
					<div className='flex items-center justify-center mt-10'>
						<Button className='bg-transparent font-medium text-lg text-gray-800 hover:bg-gray-100 w-xs border border-gray-200 h-12'>
							View all bookings
						</Button>
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
