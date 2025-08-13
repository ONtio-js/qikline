'use server';
import {
	createBusinessServiceSchema,
	updateBusinessServiceSchema,
} from '../../../../schema/schema';
import { z } from 'zod';
import { ApiWrapper } from '@/actions/wrapper';
import { revalidatePath } from 'next/cache';

export const getBusinessServices = async (accessToken: string) => {
	try {
		const response = await ApiWrapper.getInstance().get(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/services/`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return {
			status: true,
			message: 'Business services fetched successfully',
			data: response.data,
		};
	} catch (error) {
		console.log(error)
		return {
			status: false,
			message: 'Failed to fetch business services',
			data: null,
		};
	}
};

export const createBusinessService = async (
	accessToken: string,
	data: z.infer<typeof createBusinessServiceSchema>
) => {
	const validatedData = createBusinessServiceSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}

	const requestData = {
		name: validatedData.name,
		description: validatedData.description,
		price: validatedData.price.toString(),
		duration: validatedData.duration,
		category: validatedData.category,
		is_active: true,
	};

	try {
		const response = await ApiWrapper.getInstance().post(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/services/create/`,
			requestData,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);
		if (response.success) {
			revalidatePath('/admin/dashboard/services');
			return {
				status: true,
				message: 'Business service created successfully',
				data: response.data,
			};
		} else {
			return {
				status: false,
				message: response.error || 'Failed to create business service',
				data: null,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message:
				error instanceof Error
					? error.message
					: 'Failed to create business service',
			data: null,
		};
	}
};

export const updateBusinessService = async (
	accessToken: string,
	serviceId: string,
	data: z.infer<typeof updateBusinessServiceSchema>
) => {
	const validatedData = updateBusinessServiceSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append('name', validatedData.name);
	formData.append('description', validatedData.description);
	formData.append('price', validatedData.price.toString());
	formData.append('duration', validatedData.duration.toString());
	formData.append('category', validatedData.category);
	formData.append('is_active', validatedData.is_active.toString());

	try {
		const response = await ApiWrapper.getInstance().patch(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/services/${serviceId}/update/`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		if (response.success) {
			revalidatePath('/admin/dashboard/services');
			return {
				status: true,
				message: 'Business service updated successfully',
				data: response.data,
			};
		} else {
			return {
				status: false,
				message: 'Failed to update business service',
				data: null,
			};
		}
	} catch (error) {
		console.log(error)
		return {
			status: false,
			message: 'Failed to update business service',
			data: null,
		};
	}
};

export const deleteBusinessService = async (
	accessToken: string,
	serviceId: string
) => {
	try {
		const response = await ApiWrapper.getInstance().delete(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/services/${serviceId}/delete/`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log(response);
		if (response.success) {
			revalidatePath('/admin/dashboard/services');
			return {
				status: true,
				message: 'Business service deleted successfully',
				data: response.data,
			};
		} else {
			return {
				status: false,
				message: 'Failed to delete business service',
				data: null,
			};
		}
	} catch (error) {
		console.log(error)
		return {
			status: false,
			message: 'Failed to delete business service',
			data: null,
		};
	}
};
