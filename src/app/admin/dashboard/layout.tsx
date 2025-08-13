'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import React from 'react';
import SearchBox from '@/components/admin/searchBox';
import { Settings, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const pathname = usePathname();
	const isBookings = pathname.includes('bookings');

	return (
		<AuthGuard>
			<SidebarProvider>
				<AppSidebar />
				<main className=' w-full'>
				
					<div className='hidden md:flex items-center justify-between w-full p-6 pb-10 border-b border-gray-200'>
						<SearchBox placeholder='Search ' />
						<div className='flex items-center gap-x-4'>
							<Link href={'/admin/dashboard/settings'}>
							<Settings
								size={24}
								className='text-gray-400'
							/>
							</Link>
							<Link href={'/admin/dashboard/notification'}>
							<Bell
								size={24}
								className='text-gray-400'
							/>
							</Link>
						</div>
					</div>{' '}
					<div className='md:hidden flex flex-col gap-y-4 items-center'>
						<div className='flex  items-center justify-between w-full p-6  border-gray-200'>
							<SidebarTrigger />
							<div className='flex items-center gap-x-4'>
								<Link href='/admin/dashboard/settings'>
									<Settings
										size={24}
										className='text-gray-400'
									/>
								</Link>
								<Link href='/admin/dashboard/notification'>
									<Bell
										size={24}
										className='text-gray-400'
									/>
								</Link>
							</div>
						</div>

						{!isBookings && <SearchBox placeholder='Search ' />}
					</div>
					{children}
				</main>
			</SidebarProvider>
		</AuthGuard>
	);
};

export default Layout;
