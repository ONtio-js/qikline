'use client';
import { getNotifications } from '@/actions/admin/notifications/route';
import NotificationCard from '@/components/admin/NotificationCard';
import EmptyState from '@/components/status/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface Notification {
	id: number;
	title: string;
	message: string;
	category: string;
	created_at: string;
	updated_at: string;
}
const Page = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [page] = useState(1);
	const [limit] = useState(10);
	const [category] = useState<string>('');
	useEffect(() => {
		const fetchNotifications = async () => {
			const response = await getNotifications({ page, limit, category });
			if (response.status) {
				setNotifications(response.data as Notification[]);
			}
		};
		fetchNotifications();
	}, [page, limit, category]);
	return (
		<div className='p-6'>
			<div className='flex flex-col gap-y-1'>
				<h2 className=' text-xl font-semibold text-gray-800 capitalize'>
					Notifications
				</h2>
				<p className='text-gray-500 text-base max-w-[550px] '>
					Stay updated with your business activities and important
					alerts
				</p>
			</div>
			<div className='overflow-x-auto no-scrollbar'>
				<div className='grid grid-cols-4 gap-4 md:mt-6  pb-10 p-6 min-w-[1200px]'>
					<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200 '>
						<div className='flex items-center justify-between'>
							<h5 className='text-lg font-semibold text-gray-800'>
								Total Notifications
							</h5>
							<Bell
								size={30}
								className='text-gray-500'
							/>
						</div>

						<div>
							<p className='text-lg font-semibold'>100</p>
						</div>
					</div>
					<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
						<div className='flex items-center justify-between'>
							<h5 className='text-lg font-semibold text-gray-800'>
								Unread
							</h5>
							<Image
								src={'/information.svg'}
								width={30}
								height={30}
								alt='credit-card'
							/>
						</div>

						<div>
							<p className='text-lg font-semibold text-red-600'>
								5
							</p>
						</div>
					</div>
					<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
						<div className='flex items-center justify-between'>
							<h5 className='text-lg font-semibold text-gray-800'>
								Appointments
							</h5>
							<Calendar color='blue' />
						</div>
						<div>
							<p className='text-lg font-semibold text-blue-800'>
								24
							</p>
						</div>
					</div>
					<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
						<div className='flex items-center justify-between'>
							<h5 className='text-lg font-semibold text-gray-800'>
								Payment
							</h5>
							<Image
								src={'/credit-card.svg'}
								width={30}
								height={30}
								alt='credit-card'
							/>
						</div>
						<div>
							<p className='text-lg font-semibold text-green-700'>
								14{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
			<Tabs
				className='mt-10'
				defaultValue={'all'}
			>
				<TabsList className='h-13 bg-gray-100 px-2 rounded-md w-full md:w-[500px]'>
					<TabsTrigger value='all'>
						All({notifications?.length})
					</TabsTrigger>
					<TabsTrigger value='unread'>Unread</TabsTrigger>
					<TabsTrigger value='appointments'>Appointments</TabsTrigger>
					<TabsTrigger value='payments'>Payments</TabsTrigger>
					<TabsTrigger value='system'>system</TabsTrigger>
				</TabsList>
				<TabsContent value='all'>
					<div className='space-y-4'>
						{notifications?.length === 0 && (
							<EmptyState
								title='No notifications found'
								description='No notifications found, create a new notification to get started'
							/>
						)}
						{notifications?.length > 0 &&
							notifications?.map((notification) => (
								<NotificationCard
									key={notification.id}
									title={notification.title || ''}
									message={notification.message}
									type={
										notification.category === 'BOOKINGS'
											? 'BOOKINGS'
											: notification.category ===
											  'PAYMENTS'
											? 'PAYMENTS'
											: notification.category === 'SYSTEM'
											? 'SYSTEM'
											: 'SYSTEM'
									}
									createdAt={notification.created_at}
									read={false}
									id={notification.id.toString()}
								/>
							))}
					</div>
				</TabsContent>
				<TabsContent value='unread'>
					<div>
						<h1>Unread</h1>
					</div>
				</TabsContent>

				<TabsContent value='appointments'>
					<div className='space-y-4'>
						<NotificationCard
							title='New Appointment Booked'
							message='John Doe has booked an appointment for 2021-01-01 at 10:00 AM'
							type='BOOKINGS'
							createdAt='2021-01-01'
							read={true}
							id='1'
						/>
						<NotificationCard
							title='New Appointment Booked'
							message='John Doe has booked an appointment for 2021-01-01 at 10:00 AM'
							type='BOOKINGS'
							createdAt='2021-01-01'
							read={true}
							id='1'
						/>
					</div>
				</TabsContent>

				<TabsContent value='payments'>
					<div className='space-y-4'></div>
				</TabsContent>

				<TabsContent value='system'>
					<div className='space-y-4'>
						<NotificationCard
							title='System maintenance Schedule '
							message='John Doe has booked an appointment for 2021-01-01 at 10:00 AM'
							type='SYSTEM'
							createdAt='2021-01-01'
							read={true}
							id='1'
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Page;
