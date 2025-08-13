'use client';

import React from 'react';
import { useBusiness } from '@/hooks/useBusiness';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export const BusinessInfo: React.FC = () => {
	const { isLoading, error, primaryBusiness } = useBusiness();

	if (isLoading) {
		return (
			<Card>
				<CardContent className='p-6'>
					<div className='animate-pulse'>
						<div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
						<div className='h-3 bg-gray-200 rounded w-1/2'></div>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<CardContent className='p-6'>
					<p className='text-red-600'>
						Error loading business data: {error}
					</p>
				</CardContent>
			</Card>
		);
	}

	if (!primaryBusiness) {
		return (
			<Card>
				<CardContent className='p-6'>
					<p className='text-gray-500'>No business data available</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center justify-between'>
					<span>Business Information</span>
					<Badge
						variant={
							primaryBusiness.is_active ? 'default' : 'secondary'
						}
					>
						{primaryBusiness.is_active ? 'Active' : 'Inactive'}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div>
					<h3 className='font-semibold text-lg'>
						{primaryBusiness.name}
					</h3>
					<p className='text-sm text-gray-600 capitalize'>
						{primaryBusiness.category.replace('_', ' ')}
					</p>
				</div>

				<div className='space-y-2'>
					<p className='text-sm'>
						<span className='font-medium'>Address:</span>{' '}
						{primaryBusiness.address}, {primaryBusiness.city},{' '}
						{primaryBusiness.state}
					</p>
					<p className='text-sm'>
						<span className='font-medium'>Phone:</span>{' '}
						{primaryBusiness.phone_number}
					</p>
					<p className='text-sm'>
						<span className='font-medium'>Email:</span>{' '}
						{primaryBusiness.email}
					</p>
					{primaryBusiness.website && (
						<p className='text-sm'>
							<span className='font-medium'>Website:</span>{' '}
							{primaryBusiness.website}
						</p>
					)}
				</div>

				{primaryBusiness.services &&
					primaryBusiness.services.length > 0 && (
						<div>
							<h4 className='font-medium mb-2'>
								Services ({primaryBusiness.services.length})
							</h4>
							<div className='space-y-1'>
								{primaryBusiness.services
									.slice(0, 3)
									.map((service) => (
										<div
											key={service.id}
											className='flex justify-between text-sm'
										>
											<span>{service.name}</span>
											<span className='text-gray-600'>
												₦{service.price}
											</span>
										</div>
									))}
								{primaryBusiness.services.length > 3 && (
									<p className='text-xs text-gray-500'>
										+{primaryBusiness.services.length - 3}{' '}
										more services
									</p>
								)}
							</div>
						</div>
					)}
			</CardContent>
		</Card>
	);
};
