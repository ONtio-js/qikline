'use client';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import React, { useState } from 'react';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import BookForm from '@/components/forms/booking/BookForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/customer/BookingForm';
import { useParams } from 'next/navigation';

const Page = () => {
	const params = useParams();
	const id = params.id as string;
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<BookingForm
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				customerId={id}
				customerName={'customerName'}
				customerEmail={'customerEmail'}
				customerPhone={'customerPhone'}
				serviceId={'serviceId'}
				serviceName={'serviceName'}
				time={'time'}
				date={new Date()}
			/>
			<div className='w-full  space-y-4 p-6 border-b border-gray-200'>
				<div className='flex items-center gap-x-2 justify-between'>
					<Link
						href={'/customers'}
						className='text-gray-500  font-medium flex items-center gap-x-2'
					>
						<ArrowLeft className='w-5 h-5 text-blue-700' />
						Back
					</Link>
					<Button
						onClick={() => setIsOpen(true)}
						variant='default'
						className=' md:hidden rounded-md border-none bg-blue-700 text-white'
					>
						Book an Appointment
					</Button>
				</div>
			</div>
			<div className='p-6 space-y-4 flex flex-col md:flex-row gap-x-10'>
				<div className='w-full md:w-[60%] space-y-4'>
					<Image
						src={'/cus3.jpg'}
						alt='customer'
						width={500}
						height={500}
						className='w-full  md:h-96 h-48 object-cover rounded-lg'
					/>
					<h3 className='text-2xl font-bold'>Serenity Spa</h3>
					<div className='flex items-center gap-x-5'>
						<span className='  text-gray-600  rounded-md  mb-1 flex items-center gap-x-2'>
							<Star className='w-5 h-5 text-yellow-500' />
							<p className='text-gray-500 font-semibold text-base'>
								4.5
							</p>
						</span>
						<p className='text-gray-500 text-base font-medium'>
							(123 reviews)
						</p>
						<div className='flex items-center gap-x-2'>
							<span className=' bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md  mb-1 flex items-center gap-x-1'>
								wellness
							</span>
							<span className=' bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md  mb-1 flex items-center gap-x-1'>
								tech
							</span>
							<span className=' bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md  mb-1 flex items-center gap-x-1'>
								cleaning
							</span>
						</div>
					</div>
					<p className='text-gray-700 '>
						Serenity Spa is a luxurious spa that offers a range of
						services to help you relax and rejuvenate, located in
						the heart of the city.
					</p>
					<Tabs
						defaultValue='about'
						className='w-full mt-10'
					>
						<TabsList className='w-full max-w-xs h-12 p-1'>
							<TabsTrigger
								value='about'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white'
							>
								About
							</TabsTrigger>
							<TabsTrigger
								value='services'
								className='data-[state=active]:bg-blue-700 data-[state=active]:text-white'
							>
								Services
							</TabsTrigger>
						</TabsList>
						<TabsContent value='about'>
							<div className='grid grid- gap-4'>
								<h2 className='text-xl font-medium'>
									{' '}
									About Serenity Spa
								</h2>
								<p className='text-gray-700 '>
									Serenity Spa is a luxurious spa that offers
									a range of services to help you relax and
									rejuvenate, located in the heart of the
									city. Serenity Spa is a luxurious spa that
									offers a range of services to help you relax
									and rejuvenate, located in the heart of the
									city. Serenity Spa is a luxurious spa that
									offers a range of services to help you relax
									and rejuvenate, located in the heart of the
									city.
								</p>
								<div className='flex flex-col border border-gray-200 p-4 py-8 gap-y-4 rounded-lg mt-4'>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out group-hover:translate-x-1'>
										<MapPin className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											123 Main St, Anytown, USA
										</p>
									</div>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out group-hover:translate-x-1'>
										<Phone className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											+123 456 7890
										</p>
									</div>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out group-hover:translate-x-1'>
										<Mail className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											info@serenityspa.com
										</p>
									</div>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out hover:translate-x-1'>
										<Link
											href={'https://www.serenityspa.com'}
											className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'
										/>
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											www.serenityspa.com
										</p>
									</div>
								</div>
								<div className='mt-4 border border-gray-200  p-8 gap-y-4 rounded-lg'>
									<h2 className='text-xl font-medium mb-10'>
										Opening Hours
									</h2>
									<div className='flex flex-col gap-y-8 w-full mt-2'>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Monday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Tuesday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Wednesday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Thursday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Friday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Saturday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
										<p className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'>
											Sunday{' '}
											<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
												10:00 AM - 10:00 PM
											</span>{' '}
										</p>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value='services'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='bg-gray-100 p-4 rounded-lg'>
									<h3 className='text-lg font-bold'>
										Reviews
									</h3>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>
				<div className='hidden md:block w-[40%]'>
					<div className='border border-gray-200 p-4 rounded-lg '>
						<h2 className='text-xl font-medium '>
							Book an Appointment
						</h2>
						<p className='text-gray-500 text-sm'>
							Book an appointment with Serenity Spa {id}
						</p>
						<p className='text-gray-500 text-sm'>
							Select a service and date
						</p>
						<div>
							<BookForm />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
