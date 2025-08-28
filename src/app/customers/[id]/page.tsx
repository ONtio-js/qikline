'use client';
import { ArrowLeft, Mail, MapPin, Link as LinkIcon } from 'lucide-react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import BookForm from '@/components/forms/booking/BookForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/customer/BookingForm';
import { useParams } from 'next/navigation';

interface BusinessProps {
	id: number;
	name: string;
	description: string;
	image: string;
	location: string;
	category: string[];
	rating: number;
	address: string;
	city: string;
	state: string;
	services: {
		id: number;
		name: string;
	}[];
	phone_number: string;
	reviews: number;
	email: string;
	website: string;
	business_hours: {
		id: number;
		day: string;
		opening_time: string;
		closing_time: string;
		day_name: string;
		is_closed: boolean;
	}[];
}

const Page = () => {
	const params = useParams();
	const id = params.id as string;
	const [isOpen, setIsOpen] = useState(false);
	const [businesses, setBusinesses] = useState<BusinessProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchBusinesses = async () => {
			try {
				setIsLoading(true);
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				console.log('API URL:', apiUrl);

				if (!apiUrl) {
					console.error('NEXT_PUBLIC_API_URL is not defined');
					return;
				}

				const response = await fetch(apiUrl + '/businesses/');
				console.log('Response status:', response.status);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log('API response:', data);
				setBusinesses(data.data || []);
			} catch (error) {
				console.error('Error fetching businesses:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBusinesses();
	}, [id]);
	const business = businesses?.find(
		(business: BusinessProps) => business.id === parseInt(id)
	);
	console.log('Business data:', business);
	console.log('Business hours:', business?.business_hours);

	if (isLoading) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto'></div>
					<p className='mt-4 text-gray-600'>
						Loading business information...
					</p>
				</div>
			</div>
		);
	}

	if (!business) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<div className='text-center'>
					<p className='text-gray-600'>Business not found</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<BookingForm
				isOpen={isOpen}
				business={business}
				onClose={() => setIsOpen(false)}
				customerId={id}
				customerName={'customerName'}
				customerEmail={'customerEmail'}
				customerPhone={'customerPhone'}
				serviceId={'1'}
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
					<h3 className='text-2xl font-bold'>{business?.name}</h3>
					<div className='flex items-center gap-x-5'>
						<span className='  text-gray-600  rounded-md  mb-1 flex items-center gap-x-2'>
							<Star className='w-5 h-5 text-yellow-500' />
							<p className='text-gray-500 font-semibold text-base'>
								{business?.rating ?? '2.5'}
							</p>
						</span>
						<p className='text-gray-500 text-base font-medium'>
							({business?.reviews ?? '123'} reviews)
						</p>
						<div className='flex items-center gap-x-2'>
							<span className=' bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md  mb-1 flex items-center gap-x-1 lowercase'>
								{business?.category ?? 'wellness'}
							</span>
						</div>
					</div>
					<p className='text-gray-700 line-clamp-4'>
						{business?.description && (
							<>
								<span className='uppercase'>
									{business?.description[0]}
								</span>
								{business?.description?.slice(1)}
							</>
						)}
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
								<h2 className='text-xl font-medium capitalize '>
									{' '}
									About {business?.name}
								</h2>
								<p className='text-gray-700 '>
									{business?.description}
								</p>
								<div className='flex flex-col border border-gray-200 p-4 py-8 gap-y-4 rounded-lg mt-4'>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out group-hover:translate-x-1'>
										<MapPin className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											{business?.address},{' '}
											{business?.city}, {business?.state}
										</p>
									</div>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out group-hover:translate-x-1'>
										<Phone className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											{business?.phone_number}
										</p>
									</div>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out group-hover:translate-x-1'>
										<Mail className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											{business?.email}
										</p>
									</div>
									<div className='flex items-center gap-x-2 group transition-all duration-300 ease-in-out hover:translate-x-1'>
										<LinkIcon className='w-5 h-5 text-gray-500 group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1' />
										<p className='text-gray-500 text-base group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1 font-medium'>
											{business?.website ||
												'www.serenityspa.com'}
										</p>
									</div>
								</div>
								<div className='mt-4 border border-gray-200  p-8 gap-y-4 rounded-lg'>
									<h2 className='text-xl font-medium mb-10'>
										Opening Hours
									</h2>
									<div className='flex flex-col gap-y-8 w-full mt-2'>
										{business?.business_hours &&
										business.business_hours.length > 0 ? (
											business.business_hours.map(
												(hour) => (
													<div
														key={hour.id}
														className='group text-gray-500 text-base font-medium flex items-center gap-x-2 justify-between hover:text-blue-700 transition-all duration-300 ease-in-out hover:translate-x-1'
													>
														<span>
															{hour.day_name}
														</span>
														<span className='text-gray-500 text-base font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out group-hover:translate-x-1'>
															{hour.is_closed
																? <span className='text-red-500'> Closed</span>
																: `${hour.opening_time.slice(0, 5)} - ${hour.closing_time.slice(0, 5)}`}
														</span>
													</div>
												)
											)
										) : (
											<p className='text-gray-500 text-base font-medium'>
												Opening hours not available
											</p>
										)}
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
							Book an appointment with {business?.name}
						</p>
						<p className='text-gray-500 text-sm'>
							Select a service and date
						</p>
						<div>
							<BookForm business={business} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
