'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';
const CustomersPage = () => {
	interface BusinessProps {
		id: number;
		name: string;
		description: string;
		image: string;
		location: string;
		category: string[];
		rating: number;
	}
	const businesses = [
		{
			id: 1,
			name: 'Serenity Spa',
			description:
				'Serenity Spa is a luxurious spa that offers a range of services to help you relax and rejuvenate.',
			image: '/cus1.jpg',
			location: 'Location 1, City 1',
			category: ['Beauty', 'Health & Fitness'],
			rating: 4.5,
		},
		{
			id: 2,
			name: 'Tech Wizard',
			description:
				'Tech Wizard is a tech store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus2.jpg',
			location: 'Location 2, City 2',
			category: ['BeautySpa', 'Fitness'],
			rating: 4.5,
		},
		{
			id: 3,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 4,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 5,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 6,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 7,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 8,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 9,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 10,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
		{
			id: 11,
			name: 'Cleaning Wizard',
			description:
				'Cleaning Wizard is a cleaning store that offers a range of services to help you relax and rejuvenate.',
			image: '/cus3.jpg',
			location: 'Location 3, City 3',
			category: ['Beaut', 'Health'],
			rating: 4.5,
		},
	];
	const [currentPage, setCurrentPage] = useState<number>(1);
	const businessesPerPage: number = 9;
	const totalPages: number = Math.ceil(businesses.length / businessesPerPage);
	const startIndex: number = (currentPage - 1) * businessesPerPage;
	const endIndex: number = startIndex + businessesPerPage;
	const currentBusinesses: BusinessProps[] = businesses.slice(
		startIndex,
		endIndex
	);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	return (
		<div className='p-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 relative'>
			{currentBusinesses.map((business) => (
				<div
					key={business.id}
					className='border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4'
				>
					<Image
						src={business.image}
						alt={business.name}
						width={100}
						height={100}
						className='w-35 h-20 md:h-full object-cover rounded-lg'
					/>
					<div>
						<div className='flex flex-col gap-y-2'>
							<div className='flex items-center justify-between'>
								<h2 className='text-gray-700 text-lg font-semibold'>
									{business.name}
								</h2>
								<span className='flex items-center gap-x-1'>
									<Star className='w-4 h-4 text-yellow-500' />
									<p className='text-gray-500 text-sm'>
										{business.rating}
									</p>
								</span>
							</div>

							<p className='text-gray-500 text-sm truncate w-50'>
								{business.description}
							</p>
							<div className='flex flex-wrap gap-2 mt-2'>
								{business.category.map((category: string) => (
									<span
										key={category}
										className='inline-block bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md  mb-1'
									>
										{category}
									</span>
								))}
							</div>
						</div>
						<div className='flex md:flex-col items-center justify-between'>
							<div className='flex items-center gap-x-1 mt-4'>
								<MapPin className='w-5 h-5 text-gray-500' />
								<p className='text-gray-500 text-sm'>
									{business.location}
								</p>
							</div>
							<Button
								asChild
								variant={'outline'}
								className='w-30 h-10   mt-4 border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out hover:scale-105'
							>
								<Link href={`/customers/${business.id}`}>
									View Details
								</Link>
							</Button>
						</div>
					</div>
				</div>
			))}
			{businesses.length >= businessesPerPage && (
				<div className='col-span-full flex justify-between items-center  '>
					<div className='flex items-center gap-x-10 w-full justify-center md:w-1/2 md:justify-end'>
						<Button
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
							variant={'outline'}
							className={`md:w-32  h-10   mt-4 border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
								currentPage === 1
									? ' cursor-not-allowed border-gray-300 text-gray-300'
									: ''
							}`}
						>
							Previous{' '}
							<span className={'hidden md:block '}>Page</span>
						</Button>
						<Button
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
							variant={'outline'}
							className={`md:w-32 w-20 h-10   mt-4 border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
								currentPage === totalPages
									? ' cursor-not-allowed border-gray-300 text-gray-300'
									: ''
							}`}
						>
							Next{' '}
							<span className={'hidden md:block '}>Page</span>
						</Button>
					</div>
					<div className=' items-center gap-x-2 w-1/2 justify-end hidden md:flex'>
						<p className='text-gray-500 text-sm'>page</p>
						<div className='w-20 h-10 border border-gray-200 rounded-md flex items-center justify-center'>
							{currentPage}
						</div>
						<p className='text-gray-500 text-sm'>of {totalPages}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomersPage;
