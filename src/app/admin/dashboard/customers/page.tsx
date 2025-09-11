import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronDown, MoreHorizontal } from "lucide-react";


const Page = () => {
	return (
		<>
			<h2 className='pl-6 pt-6 text-xl font-semibold text-gray-800 capitalize'>
				{' '}
				Customers
			</h2>
			<div className='p-6'>
				<Tabs
					defaultValue='allstaff'
					className='w-full  '
				>
					<div className='flex items-center justify-between'>
						<TabsList className=' h-13 bg-gray-100 px-2 rounded-md w-[500px]'>
							<TabsTrigger
								value='allstaff'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
							>
								All Customers
							</TabsTrigger>
							<TabsTrigger
								value='active'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
							>
								Active
							</TabsTrigger>
							<TabsTrigger
								value='inactive'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
							>
								Inactive
							</TabsTrigger>
							
						</TabsList>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className='flex items-center gap-x-2 bg-white h-12 text-gray-800 px-5 rounded-md cursor-pointer border border-gray-200'>
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
					<TabsContent value='allstaff'>
						<Table className='mt-6 pl-6 w-full'>
							<TableHeader className='bg-gray-100 py-2  h-12'>
								<TableRow>
									<TableHead className='pl-12'>S/N</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Phone</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Appointments</TableHead>
									<TableHead>Revenue</TableHead>
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
											<div className='flex items-center gap-x-2'>
												<span className='text-xs border border-gray-200 rounded-full px-4 py-1 text-gray-800'>
													Stylist
												</span>{' '}
												<span className='text-xs text-emerald-500'>
													Active
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										+234 812 345 6789
									</TableCell>
									<TableCell>
										john@gmail.com
									</TableCell>
									<TableCell>
										130
									</TableCell>
									<TableCell>N 156,000</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-12 mt-4'>
									<TableCell className='pl-12'>02</TableCell>
									<TableCell className='font-medium flex items-center gap-x-3 '>
										<Avatar className='w-10 h-10'>
											<AvatarFallback>JF</AvatarFallback>
										</Avatar>
										<div className='flex flex-col gap-y-1'>
											<p className='text-base font-medium'>
												Jane Fray
											</p>
											<div className='flex items-center gap-x-2'>
												<span className='text-xs border border-gray-200 rounded-full px-4 py-1 text-gray-800'>
													Specialist
												</span>{' '}
												<span className='text-xs text-emerald-500'>
													Active
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										+234 812 345 6789
									</TableCell>
									<TableCell>
										jane@gmail.com
									</TableCell>
									<TableCell>
										130
									</TableCell>
									<TableCell>N 156,000</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
								<TableRow className='h-12 mt-4'>
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
											<div className='flex items-center gap-x-2'>
												<span className='text-xs border border-gray-200 rounded-full px-4 py-1 text-gray-800'>
													Manager
												</span>{' '}
												<span className='text-xs text-destructive'>
													Inactive
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										+234 812 345 6789
									</TableCell>
									<TableCell>
										john@gmail.com
									</TableCell>
									<TableCell>
										130
									</TableCell>
									<TableCell>N 156,000</TableCell>
									<TableCell className=''>
										<MoreHorizontal size={24} />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value='pending'>
						Change your password here.
					</TabsContent>
					<TabsContent value='completed'>
						Change your password here.
					</TabsContent>
					<TabsContent value='failed'>
						Change your password here.
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
};

export default Page;