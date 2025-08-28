'use client';
import Completed from '@/components/status/completed';
import Failed from '@/components/status/Failed';
import Pending from '@/components/status/Pending';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, ChevronDown } from 'lucide-react';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MdAddCard } from 'react-icons/md';
import SearchBox from '@/components/admin/searchBox';
import { getAllBookings } from '@/actions/admin/Booking/route';
import { useEffect, useState } from 'react';
import BookingCard from '@/components/admin/BookingCard';
import CreateBookingForm from '@/components/forms/booking/CreateBookingForm';

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
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [page] = useState(1);
	const [limit] = useState(10);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const fetchBookings = async () => {
			const response = await getAllBookings(page, limit);
			if (
				response &&
				typeof response === 'object' &&
				'data' in response
			) {
				setBookings(response.data as Booking[]);
			}
		};
		fetchBookings();
	}, [page, limit]);
	console.log(bookings);
	return (
		<>
			<div className='flex flex-col md:flex-row items-center justify-between mt-6 px-6 gap-y-5'>
				<div className='space-y-2 w-full md:w-auto'>
					<h2 className=' text-xl font-semibold text-gray-800 capitalize'>
						{' '}
						Bookings
					</h2>
					<p className='text-gray-500 text-sm md:text-base'>
						Manage your bookings and business operations
					</p>
				</div>
				<div className='flex items-center  w-full md:w-auto justify-end'>
					<Button
						variant='outline'
						className='text-lg font-medium h-12 md:w-xs gap-x-2 bg-blue-700 text-white hover:bg-blue-700'
						onClick={() => setIsOpen(true)}
					>
						<MdAddCard size={24} />
						New Booking
					</Button>
				</div>
			</div>

			<div className='p-6 w-full'>
				<div className='w-full flex flex-col md:flex-row   gap-5 gap-y-3 mb-6	'>
					<SearchBox placeholder='Search ' />
					<div className='flex justify-end md:items-end gap-y-2 gap-x-5'>
						<div className='flex items-center gap-x-2'>
							<Button
								variant='outline'
								className='text-lg font-medium h-12 bg-white text-gray-800 px-5 rounded-md cursor-pointer border border-gray-200 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0'
							>
								<Calendar size={24} />
								Filter By Date
							</Button>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className='flex items-center gap-x-2 bg-white h-12 text-gray-800 px-5 rounded-md cursor-pointer border border-gray-200 focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 active:ring-0 active:ring-offset-0 focus:ring-0 focus:ring-offset-0	text-lg font-medium'>
									Filter{' '}
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
				<Tabs
					defaultValue='alltransactions'
					className='w-full overflow-x-hidden '
				>
					<div className='flex w-full overflow-x-scroll no-scrollbar items-center justify-between'>
						<TabsList className=' h-13 bg-gray-100 px-0 md:px-2 rounded-md  md:w-[650px]'>
							<TabsTrigger
								value='alltransactions'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10 text-sm md:text-base'
							>
								All Bookings ({bookings.length})
							</TabsTrigger>
							<TabsTrigger
								value='completed'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10 text-sm md:text-base'
							>
								Upcoming (10)
							</TabsTrigger>
							<TabsTrigger
								value='pending'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10 text-sm md:text-base'
							>
								Today (10)
							</TabsTrigger>
							<TabsTrigger
								value='failed'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10 text-sm md:text-base'
							>
								Completed (1306)
							</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value='alltransactions'>
						<div className='flex flex-col md:hidden gap-y-5'>
							{bookings.map((booking) => (
								<div key={booking.id}>
									<BookingCard
										id={booking.id}
										business_name={booking.business_name}
										customer_email={booking.customer_email}
										date={booking.date}
										time={booking.time}
										status={booking.status}
										status_display={booking.status_display}
										service={booking.service}
									/>
								</div>
							))}
						</div>
						<Table className='hidden md:block mt-6 pl-6 w-full'>
							<TableHeader className='bg-gray-100 py-2  h-12'>
								<TableRow>
									<TableHead className='pl-12'>S/N</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Service</TableHead>
									<TableHead>Service Duration </TableHead>

									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className='space-y-2 '>
								<TableRow className='h-12 mt-4'>
									<TableCell className='pl-12'>01</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												John Doe
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Completed />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-14 mt-4'>
									<TableCell className='pl-12'>02</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarFallback>JF</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												Jane Fray
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Failed />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-14 mt-4'>
									<TableCell className='pl-12'>03</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												John Doe
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 09:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Massage
										</span>{' '}
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value='pending'>
						<div className='flex flex-col md:hidden gap-y-5'>
							<BookingCard
								id={1}
								business_name='Sample Business'
								customer_email='john.doe@example.com'
								date='2025-01-01'
								time='10:00 AM'
								status='PENDING'
								status_display='Pending'
								service={{
									id: 1,
									name: 'Haircut',
									description: 'Professional haircut service',
									price: '50.00',
									duration: 30,
								}}
							/>
						</div>
						<Table className='hidden md:block mt-6 pl-6 w-full'>
							<TableHeader className='bg-gray-100 py-2  h-12'>
								<TableRow>
									<TableHead className='pl-12'>S/N</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Service</TableHead>
									<TableHead>Service Duration </TableHead>

									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className='space-y-2 '>
								<TableRow className='h-12 mt-4'>
									<TableCell className='pl-12'>01</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												John Doe
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-14 mt-4'>
									<TableCell className='pl-12'>02</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarFallback>JF</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												Jane Fray
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value='completed'>
						<div className='flex flex-col md:hidden gap-y-5'>
							<BookingCard
								id={1}
								business_name='Sample Business'
								customer_email='john.doe@example.com'
								date='2025-01-01'
								time='10:00 AM'
								status='COMPLETED'
								status_display='Completed'
								service={{
									id: 1,
									name: 'Haircut',
									description: 'Professional haircut service',
									price: '50.00',
									duration: 30,
								}}
							/>
						</div>
						<Table className='hidden md:block mt-6 pl-6 w-full'>
							<TableHeader className='bg-gray-100 py-2  h-12'>
								<TableRow>
									<TableHead className='pl-12'>S/N</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Service</TableHead>
									<TableHead>Service Duration </TableHead>

									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className='space-y-2 '>
								<TableRow className='h-12 mt-4'>
									<TableCell className='pl-12'>01</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												John Doe
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-14 mt-4'>
									<TableCell className='pl-12'>02</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarFallback>JF</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												Jane Fray
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value='failed'>
						<div className='flex flex-col md:hidden gap-y-5'>
							<BookingCard
								id={1}
								business_name='Sample Business'
								customer_email='john.doe@example.com'
								date='2025-01-01'
								time='10:00 AM'
								status='FAILED'
								status_display='Failed'
								service={{
									id: 1,
									name: 'Haircut',
									description: 'Professional haircut service',
									price: '50.00',
									duration: 30,
								}}
							/>
						</div>
						<Table className='hidden md:block mt-6 pl-6 w-full'>
							<TableHeader className='bg-gray-100 py-2  h-12'>
								<TableRow>
									<TableHead className='pl-12'>S/N</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Service</TableHead>
									<TableHead>Service Duration </TableHead>

									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className='space-y-2 '>
								<TableRow className='h-12 mt-4'>
									<TableCell className='pl-12'>01</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>JD</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												John Doe
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-14 mt-4'>
									<TableCell className='pl-12'>02</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarFallback>JF</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												Jane Fray
											</p>
										</div>
									</TableCell>
									<TableCell>
										<Pending />
									</TableCell>
									<TableCell>
										2025-01-01 at 10:00 AM
									</TableCell>
									<TableCell>
										{' '}
										<span className='text-gray-500 font-medium rounded-full px-2 py-1 border border-gray-500'>
											Haircut
										</span>
									</TableCell>
									<TableCell>30 mins</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
				</Tabs>
			</div>
			<CreateBookingForm
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</>
	);
};

export default Page;
