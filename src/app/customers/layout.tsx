import { Bell, Settings } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import CustomerSieBar from '@/components/customer/CustomerSieBar';
import SearchBox from '@/components/admin/searchBox';
import { Button } from '@/components/ui/button';
 
const Layout = ({children}: {children: React.ReactNode}) => {
  return (
		<SidebarProvider>
			<CustomerSieBar />
			<main className=' w-full'>
				{/* <SidebarTrigger color='blue' /> */}
				<div className='flex items-center justify-end w-full p-6 pb-10 border-b border-gray-200'>
					<div className='flex items-center gap-x-4'>
						<Settings
							size={24}
							className='text-gray-400'
						/>
						<Bell
							size={24}
							className='text-gray-400'
						/>
					</div>
				</div>{' '}
				<div className='flex flex-col gap-y-4 w-full p-6  border-b border-gray-200'>
                    <div>
					<h4 className='text-2xl font-semibold text-gray-700'>Find Businesses & Services </h4>
					<p className='text-gray-500'>Manage your appointments and business operations</p>
                    </div>
                    <div className='flex items-center  w-full py-6 gap-x-4'>
                        <SearchBox placeholder='Search for a business by name, location, or category' />
                        <Button  className='w-40 h-11 text-[16px] bg-blue-700 text-white rounded-md hover:bg-blue-800 font-semibold'>
                            Search
                        </Button>
                    </div>
                   
				</div>
				{children}
			</main>
		</SidebarProvider>
  );
};

export default Layout;