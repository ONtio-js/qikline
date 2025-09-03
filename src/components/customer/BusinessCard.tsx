import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';
import { Star } from 'lucide-react';
import Image from 'next/image';
interface BusinessProps {
	id: number;
	name: string;
	description?: string;
	image: string;
	location: string;
	category?: string[];
	rating: number;
	address: string;
	city: string;
	state: string;
	images?: {
		id: number;
		image: string;
	}[];
}
const BusinessCard = React.memo(
	({
		business,
		style,
	}: {
		business: BusinessProps;
		style?: React.CSSProperties;
	}) => {
		return (
			<div
				key={business?.id}
				className='border border-gray-200 rounded-lg p-4 flex flex-col  gap-4'
				style={style}
			>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-3'>
						<div className='w-11 h-11 rounded-full overflow-hidden bg-gray-100'>
							<Image
								src={
									business?.images?.[0]?.image || '/cus1.jpg'
								}
								alt={business?.name}
								width={100}
								height={100}
								className='w-35 h-20 md:h-40 object-cover rounded-lg'
							/>
						</div>
						<div className='flex flex-col gap-y-2 w-40'>
							<h2 className='text-gray-700 text-lg font-semibold'>
								{business?.name}
							</h2>
							<p className='text-gray-500 text-sm truncate w-40 line-clamp-2'>
								{business?.description}
							</p>
						</div>
					</div>
					<div className='flex items-center gap-x-2'>
						<Star className='w-4 h-4 text-yellow-500' />
						<p className='text-gray-500 '>
							{business?.rating || 0}
						</p>
					</div>
				</div>
				<div>
					<div className='flex flex-col gap-y-2'>
						<div className='flex flex-wrap gap-2 mt-2'>
							<span className='inline-block bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-md  mb-1'>
								{business?.category}
							</span>
						</div>
					</div>
					<div className='flex flex-col items-start justify-between'>
						<div className='flex items-center gap-x-1 mt-4'>
							<MapPin className='w-5 h-5 text-gray-500' />
							<p className='text-gray-500 text-sm'>
								{business?.address}, {business?.city},{' '}
								{business?.state}
							</p>
						</div>
						<Button
							asChild
							variant={'outline'}
							className='w-30 h-10   mt-4 border border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-md transition-all duration-300 ease-in-out hover:scale-105'
						>
							<Link href={`/businesses/${business?.id}`}>
								View Details
							</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}
);

BusinessCard.displayName = 'BusinessCard';

export default BusinessCard;
