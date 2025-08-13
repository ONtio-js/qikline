'use client';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Business } from '@/components/forms/settings/Business';
import { HourSetting } from '@/components/forms/settings/HourSetting';
import { BookingSetting } from '@/components/forms/settings/BookingSetting';

const Page = () => {
	
	return (
		<div>
			<h2 className='pl-6 pt-6 text-xl font-semibold text-gray-800 capitalize'>
				{' '}
				Business Settings
			</h2>
			<p className='pl-6  text-gray-500'>
				Manage your business profile, Hours and booking settings here.
			</p>
			<div className=''>
				<Tabs
					defaultValue='businessprofile'
					className='w-full  '
				>
					<div className='flex items-center justify-between px-6 pt-6'>
						<TabsList className=' h-13 bg-gray-100 px-2 rounded-md w-[500px]'>
							<TabsTrigger
								value='businessprofile'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
							>
								Business Profile
							</TabsTrigger>
							<TabsTrigger
								value='businesshours'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
							>
								Business Hours
							</TabsTrigger>
							<TabsTrigger
								value='bookingsettings'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
							>
								Booking Settings
							</TabsTrigger>
						</TabsList>
					</div>
					<Separator className='my-4' />
					<TabsContent
						value='businessprofile'
						className='p-6'
					>
					
						<Business />
					
					</TabsContent>
					<TabsContent
						value='businesshours'
						className='p-6'
					>
					<HourSetting />
					</TabsContent>
					<TabsContent
						value='bookingsettings'
						className='p-6'
					>
						<BookingSetting />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Page;
