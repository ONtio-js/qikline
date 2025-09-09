'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import React from 'react';
import SearchBox from '@/components/admin/searchBox';
import { Settings, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import { BusinessProvider } from '@/components/providers/BusinessProvider';
import { useNetworkStatus } from '@/hooks/use-network-status';
import OfflineState from '@/components/status/OfflineState';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const pathname = usePathname();
	const isBookings = pathname.includes('bookings');
	const {isOffline} = useNetworkStatus();
	
	return (
		<AuthGuard>
			<BusinessProvider>
				<SidebarProvider>
					<AppSidebar />
					<main className=' w-full'>
						<div className='hidden md:flex items-center justify-between w-full p-6 pb-10 border-b border-gray-200'>
							<SearchBox placeholder='Search ' />
							<div className='flex items-center gap-x-4'>
								<Link href={'/admin/dashboard/settings'}>
									<Settings
										size={24}
										className={`${
											pathname.includes('settings') ||
											pathname.includes('profile')
												? 'text-blue-700'
												: 'text-gray-400'
										} `}
									/>
								</Link>
								<Link href={'/admin/dashboard/notification'}>
									<Bell
										size={24}
										className={`${
											pathname.includes('notification')
												? 'text-blue-700'
												: 'text-gray-400'
										} `}
									/>
								</Link>
							</div>
						</div>{' '}
						<div className='md:hidden  flex flex-col gap-y-4 items-center'>
							<div className=' bg-white/50 backdrop-blur-md fixed top-0 left-0 right-0  flex  items-center justify-between w-full p-6 py-2  border-gray-200'>
								<SidebarTrigger />
								<div className='flex items-center gap-x-4'>
									<Link href='/admin/dashboard/settings'>
										<Settings
											size={24}
											className={`${
												pathname.includes('settings') ||
												pathname.includes('profile')
													? 'text-blue-700'
													: 'text-gray-400'
											} `}
										/>
									</Link>
									<Link href='/admin/dashboard/notification'>
										<Bell
											size={24}
											className={`${
												pathname.includes(
													'notification'
												)
													? 'text-blue-700'
													: 'text-gray-400'
											} `}
										/>
									</Link>
								</div>
							</div>
							<div className='w-full px-6 mt-24'>
								{!isBookings && (
									<SearchBox placeholder='Search ' />
								)}
							</div>
						</div>

						{ isOffline ? <OfflineState /> : children}
					</main>
				</SidebarProvider>
			</BusinessProvider>
		</AuthGuard>
	);
};

export default Layout;
