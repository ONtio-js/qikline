'use client';
import { authService } from '@/services/auth';
import {
	createBusinessSchema,
	updateBusinessSchema,
	businessHoursSchema,
	bookingSettingsSchema,
} from '../../../../schema/schema';
import { z } from 'zod';
import { apiWrapper } from '@/actions/wrapper';
import { handleApiErrors } from '@/lib/utils';

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

	if (data instanceof FormData) {
		formData = data;
	} else {
		const validatedData = createBusinessSchema.parse(data);
		if (!validatedData) {
			return {
				status: false,
				message: 'Invalid data',
			};
		}

		formData = new FormData();
		formData.append('name', validatedData.name);
		formData.append('description', validatedData.description);
		formData.append('address', validatedData.address);
		formData.append('phone_number', validatedData.phone_number);
		formData.append('email', validatedData.email);
		formData.append('website', validatedData.website || '');
		formData.append('category', validatedData.category || '');
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
				transformRequest: (data) => data,
			}
		);

		if (response.success) {
			return {
				status: true,
				message: 'Business created successfully',
				data: response.data,
			};
		}
		return {
			status: false,
			message: handleApiErrors(response.error),
			data: null,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message:
				error instanceof Error
					? error.message
					: 'Failed to create business',
			data: null,
		};
	}
};

export const updateBusiness = async (
	data: z.infer<typeof updateBusinessSchema> | FormData
) => {
	let formData: FormData;

	if (data instanceof FormData) {
		formData = data;
	} else {
		const validatedData = updateBusinessSchema.parse(data);
		if (!validatedData) {
			return {
				status: false,
				message: 'Invalid data',
			};
		}
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
		const response = await apiWrapper.patch(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/update/`,
			formData,
			{
				transformRequest: (data) => data,
			}
		);
		if (response.success) {
			return {
				status: true,
				message: 'Business updated successfully',
				data: response.data,
			};
		}
		
		return {
			status: false,
			message: response.error,
			
		};
	} catch (error) {
		
		return {
			status: false,
			message: error instanceof Error ? error.message : 'Failed to update business',
			
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

export const getBusinessHours = async () => {
	try {
		const response = await apiWrapper.get(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/me/`
		);

		if (response.success && response.data) {
			const businessData = response.data as {
				business_hours?: Array<unknown>;
			};
			const businessHours = businessData.business_hours || [];

			return {
				status: true,
				message: 'Business hours fetched successfully',
				data: businessHours,
			};
		}

		return {
			status: false,
			message: 'Failed to fetch business hours',
			data: null,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to fetch business hours',
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
		if (response.success) {
			return {
				status: true,
				message: 'Business hours set successfully',
				data: response.data,
			};
		}
		return {
			status: false,
			message: response.error,
			data: null,
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

export const getBookingSettings = async () => {
	try {
		const response = await apiWrapper.get(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/settings/booking/`
		);
		if (response.success) {
			return {
				status: true,
				message: 'Booking settings fetched successfully',
				data: response.data,
			};
		}
		return {
			status: false,
			message: 'Failed to fetch booking settings',
			data: null,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to fetch booking settings',
			data: null,
		};
	}
};

export const updateBookingSettings = async (
	data: z.infer<typeof bookingSettingsSchema>
) => {
	const validatedData = bookingSettingsSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append(
		'is_booking_enabled',
		validatedData.is_booking_enabled.toString()
	);
	formData.append(
		'is_deposit_required',
		validatedData.is_deposit_required.toString()
	);
	formData.append(
		'cancellation_notice',
		validatedData.cancellation_notice.toString()
	);
	formData.append(
		'advance_booking_time',
		validatedData.advance_booking_time.toString()
	);
	formData.append('created_at', new Date().toISOString());
	formData.append('updated_at', new Date().toISOString());

	try {
		const response = await apiWrapper.patch(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/settings/booking/`,
			formData
		);
		if (response.success) {
			return {
				status: true,
				message: 'Booking settings updated successfully',
				data: response.data,
			};
		}
		return {
			status: false,
			message: response.error,
			data: null,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to update booking settings',
			data: null,
		};
	}
};

export const getBusinessMetrics = async (id:string) => {
	try {
		const response = await apiWrapper.get(
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/${id}/metrics/`
		);
		if (response.success) {
			return {
				status: true,
				message: 'Business metrics fetched successfully',
				data: response.data,
			};
		}
		return {
			status: false,
			message: 'Failed to fetch business metrics',
			data: null,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to fetch business metrics',
			data: null,
		};
	}
};