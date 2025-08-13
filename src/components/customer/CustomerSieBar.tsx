import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from '../ui/sidebar';
import Logo from '../Logo';
import { Checkbox } from '../ui/checkbox';

const CustomerSieBar = () => {
  return (
		<Sidebar>
			<SidebarContent className=' p-4 text-gray-700'>
				<SidebarGroup className='flex flex-col justify-between h-full'>
					<div>
						<SidebarGroupLabel className='mb-5'>
							<Logo />
						</SidebarGroupLabel>
						<SidebarGroupContent className='flex flex-col mt-20'>
							<SidebarMenu className='space-y-3 mt-10 border border-gray-200 p-4 rounded-md text-gray-500'>
								<h2 className='text-gray-700 text-lg font-semibold mb-4'>Filters</h2>
								<div className='flex flex-col gap-y-2'>
									<div className='flex items-center gap-x-2'>
										<h3 className='text-gray-700 text-sm font-semibold'>Categories</h3> 
									</div>
                                    <div className='flex items-center gap-x-2 mt-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Beauty & Spa</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Health & Fitness</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Food & Drink</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Shopping</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Entertainment</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Education</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Cleaning</p>
                                    </div>
                                    <div className='flex items-center gap-x-2'>
                                        <Checkbox />
                                        <p className='text-gray-500 text-sm font-semibold'>Other</p>
                                    </div>
                                    
								</div>
							</SidebarMenu>
						</SidebarGroupContent>
					</div>
					
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
  );
}

export default CustomerSieBar