'use client';
import { authService } from '@/services/auth';
import {
	createBusinessSchema,
	updateBusinessSchema,
	businessHoursSchema,
} from '../../../../schema/schema';
import { z } from 'zod';
import { apiWrapper } from '@/actions/wrapper';

// Define business hours array schema

export const getBusiness = async () => {
	const response = await apiWrapper.get(
		`${process.env.NEXT_PUBLIC_API_URL}/businesses/me/`
	);
	const responseData = response.data as {
		success: boolean;
		data: Record<string, unknown>;
	};
	if (responseData.success) {
		return {
			status: true,
			data: responseData.data,
		};
	}
	return {
		status: false,
		data: null,
	};
};

export const getBusinessById = async (id: string) => {
	const response = await apiWrapper.get(
		`${process.env.NEXT_PUBLIC_API_URL}/businesses/${id}/`
	);
	if (response.success) {
		return {
			status: true,
			message: 'Business fetched successfully',
			data: response.data,
		};
	}
	return {
		status: false,
		message: 'Failed to fetch business',
		data: null,
	};
};

export const createBusiness = async (
	data: z.infer<typeof createBusinessSchema> | FormData
) => {
	let formData: FormData;

	// Check if data is FormData (for file uploads) or schema data
	if (data instanceof FormData) {
		formData = data;
	} else {
		// Validate schema data
		const validatedData = createBusinessSchema.parse(data);
		if (!validatedData) {
			return {
				status: false,
				message: 'Invalid data',
			};
		}

		// Create FormData from validated data
		formData = new FormData();
		formData.append('name', validatedData.name);
		formData.append('description', validatedData.description);
		formData.append('address', validatedData.address);
		formData.append('phone_number', validatedData.phone_number);
		formData.append('email', validatedData.email);
		formData.append('website', validatedData.website || '');
		formData.append('category', validatedData.category);
		formData.append('city', validatedData.city);
		formData.append('state', validatedData.state);
		formData.append('country', validatedData.country);
		formData.append('is_active', 'true');
	}

	try {
		const response = await apiWrapper.post(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/create/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return {
			status: true,
			message: 'Business created successfully',
			data: response.data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to create business',
			data: null,
		};
	}
};

export const updateBusiness = async (
	data: z.infer<typeof updateBusinessSchema>
) => {
	const validatedData = updateBusinessSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append('name', validatedData.name);
	formData.append('description', validatedData.description);
	formData.append('address', validatedData.address);
	formData.append('phone_number', validatedData.phone_number);
	formData.append('email', validatedData.email);
	formData.append('website', validatedData.website || '');
	formData.append('category', validatedData.category);
	formData.append('city', validatedData.city);
	formData.append('state', validatedData.state);
	formData.append('country', validatedData.country);
	formData.append('is_active', 'true');

	try {
		const response = await apiWrapper.patch(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/update/`,
			formData
		);
		return {
			status: true,
			message: 'Business updated successfully',
			data: response.data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to update business',
			data: null,
		};
	}
};

export const deleteBusiness = async (id: string) => {
	try {
		const response = await authService
			.getAxiosInstance()
			.delete(`${process.env.NEXT_PUBLIC_API_URL}/businesses/${id}/`);
		return {
			status: true,
			message: 'Business deleted successfully',
			data: response.data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to delete business',
			data: null,
		};
	}
};

export const setBusinessHours = async (
	data: z.infer<typeof businessHoursSchema>
) => {
	const validatedData = businessHoursSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}

	const formData = new FormData();

	// Add each business hours entry to the form data
	validatedData.forEach((hoursEntry, index) => {
		formData.append(
			`business_hours[${index}][day]`,
			hoursEntry.day.toString()
		);
		formData.append(
			`business_hours[${index}][opening_time]`,
			hoursEntry.opening_time
		);
		formData.append(
			`business_hours[${index}][closing_time]`,
			hoursEntry.closing_time
		);
		formData.append(
			`business_hours[${index}][is_closed]`,
			hoursEntry.is_closed.toString()
		);
	});

	try {
		const response = await apiWrapper.patch(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/hours/update/`,
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return {
			status: true,
			message: 'Business hours set successfully',
			data: response.data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to set business hours',
			data: null,
		};
	}
};
