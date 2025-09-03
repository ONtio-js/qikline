'use client';
import { LogOut, Bell, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {jwtDecode} from 'jwt-decode';
import { getAccessToken } from '@/utils/token';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import Logo from '../Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
	MdOutlineDashboard,
	MdOutlineMedicalServices,
	MdOutlinePeople,
} from 'react-icons/md';
import { authService } from '@/services/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type MenuItem = {
	title: string;
	url: string;
	icon: React.ReactNode;
};

// Menu items.
const items: MenuItem[] = [
	{
		title: 'Dashboard',
		url: '/admin/dashboard',
		icon: <MdOutlineDashboard size={24} />,
	},
	{
		title: 'Bookings',
		url: '/admin/dashboard/bookings',
		icon: <HiOutlineCalendarDays size={24} />,
	},
	{
		title: 'Services',
		url: '/admin/dashboard/services',
		icon: <MdOutlineMedicalServices size={24} />,
	},
	{
		title: 'Customers',
		url: '/admin/dashboard/customers',
		icon: <MdOutlinePeople size={24} />,
	},
	{
		title: 'Analytics',
		url: '/admin/dashboard/analytics',
		icon: (
			<Image
				src={'/admin/icons/waterfall.svg'}
				alt='inbox'
				width={24}
				height={24}
			/>
		),
	},
	{
		title: 'Settings',
		url: '/admin/dashboard/settings',
		icon: <Settings size={24} />,
	},
	{
		title: 'Notifications',
		url: '/admin/dashboard/notification',
		icon: <Bell size={24} />,
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar();

	const accessToken = getAccessToken();
	const decodedToken : {email: string[]} = jwtDecode(accessToken as string);

	const handleLogout = () => {
		authService.logout();
	};

	const handleNavigationClick = () => {
		// Close mobile sidebar when navigation link is clicked
		setOpenMobile(false);
	};

	return (
		<Sidebar>
			<SidebarContent className=' p-4 text-gray-700'>
				<SidebarGroup className='flex flex-col justify-between h-full'>
					<div>
						<SidebarGroupLabel className='mb-5'>
							<Logo />
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className='space-y-3 mt-10'>
								{items.map((item) => (
									<SidebarMenuItem
										key={item.title}
										className={cn(
											'  hover:bg-blue-700/10 p-2 rounded-md',
											pathname === item.url &&
												'bg-blue-700/10 text-blue-700'
										)}
									>
										<Link
											href={item.url}
											className={cn(
												' flex items-center gap-x-2'
											)}
											onClick={handleNavigationClick}
										>
											<span
												className={cn(
													'text-gray-400 hover:text-blue-700',
													pathname === item.url
														? 'text-blue-700'
														: ''
												)}
											>
												{item.icon}
											</span>

											<span>{item.title}</span>
										</Link>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</div>
					<SidebarFooter className='flex flex-col gap-y-5 border-t border-gray-200 pt-6'>
						<Link
							onClick={handleNavigationClick}
							href={'/admin/dashboard/profile'}
							className='flex items-center gap-x-2 cursor-pointer'
						>
							<Avatar className=' bg-blue-700'>
								<AvatarImage src={'/admin/icons/user.svg'} />
								<AvatarFallback>{decodedToken.email[0].toUpperCase()}</AvatarFallback>
							</Avatar>
							<div>
								<p className='text-xs text-gray-500'>
									{decodedToken.email}
								</p>
							</div>
						</Link>
						<button
							onClick={handleLogout}
							className='flex items-center gap-x-4 w-full p-2 rounded-md transition-colors cursor-pointer'
						>
							<LogOut
								size={20}
								className='text-gray-400'
							/>
							<span className='text-gray-700'>Logout</span>
						</button>
					</SidebarFooter>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
