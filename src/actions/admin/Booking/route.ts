import { apiWrapper } from '@/actions/wrapper';
import { z } from 'zod';
import { bookFormSchema } from '../../../../schema/schema';

export const getBookings = async (
	accessToken: string,
	page: number,
	limit: number
) => {
	const response = await apiWrapper.get(
		`${process.env.NEXT_PUBLIC_API_URL}/bookings/business-bookings/`,
		{
			params: {
				page,
				limit,
			},
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data;
};

export const createBooking = async (data: z.infer<typeof bookFormSchema>) => {
	const validatedData = bookFormSchema.safeParse(data);
	if (!validatedData.success) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append('service', validatedData.data.service);
	formData.append('name', validatedData.data.name);
	formData.append('phone_number', validatedData.data.phone);
	formData.append('email', validatedData.data.email);
	formData.append('date', validatedData.data.date);
	formData.append('time', validatedData.data.time);
	try {
		const response = await apiWrapper.post(
			`${process.env.NEXT_PUBLIC_API_URL}/bookings/create/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return {
			status: true,
			message: response.data,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error
					? error.message
					: 'Error creating booking',
		};
	}
};

export const getAllBookings = async (page: number, limit: number) => {
	const response = await apiWrapper.get(
		`${process.env.NEXT_PUBLIC_API_URL}/bookings/business-bookings/`,
		{
			params: {
				page,
				limit,
			},
		}
	);
	console.log(response.data);
	return response.data;
};

export const updateBooking = async (
	id: number,
	data: {
		status: string;
		reason?: string;
	}
) => {
	const validatedData = z
		.object({
			status: z.string(),
			reason: z.string().optional(),
		})
		.safeParse(data);
	if (!validatedData.success) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append('status', validatedData.data.status);
	formData.append('reason', validatedData.data.reason || '');
	try {
		const response = await apiWrapper.patch(
			`${process.env.NEXT_PUBLIC_API_URL}/bookings/business-bookings/${id}/update/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return {
			status: true,
			message: response.data,
		};
	} catch (error) {
		return {
			status: false,
			message:
				error instanceof Error
					? error.message
					: 'Error updating booking',
		};
	}
};
