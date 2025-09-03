import { z } from 'zod';
import { bookFormSchema, rescheduleFormSchema, reviewSchema } from '../../../schema/schema';

export const bookAppointment = async (data: z.infer<typeof bookFormSchema>) => {
	const validatedData = bookFormSchema.safeParse(data);

	if (!validatedData.success) {
		return {
			error: validatedData.error.message,
		};
	}

	const { service, date, time, name, email, phone } = validatedData.data;

	const formData = new FormData();
	formData.append('service', service);
	formData.append('date', date);
	formData.append('time', time);
	formData.append('name', name);
	formData.append('email', email);
	formData.append('phone_number', phone);

	try {
		const appointment = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/bookings/create/`,
			{
				method: 'POST',
				body: formData,
			}
		);
		const data = await appointment.json();
		console.log(data);
		if (data.success === false) {
			return {
				status: false,
				message:
					data?.errors?.non_field_errors[0] ||
					data?.errors?.date[0] ||
					'Failed to book appointment',
			};
		}
		return {
			status: true,
			message: data.data,
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : 'Error occurred',
		};
	}
};

export const rescheduleBooking = async (data: z.infer<typeof rescheduleFormSchema>) => {
	const validatedData = rescheduleFormSchema.safeParse(data);
	if (!validatedData.success) {
		return {
			status: false,
			message: validatedData.error.message,
		};
	}
	const { date, time, email, bookingId } = validatedData.data;
	const formData = new FormData();
	formData.append('date', date);
	formData.append('time', time);
	formData.append('email', email);
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/my-bookings/${bookingId}/reschedule/`, {
		method: 'PATCH',
		body: formData,
	});
	const responseData = await response.json();
	console.log(responseData);
	if (responseData.success === false) {
		return {
			status: false,
			message: responseData.message,
		};
	}
	return {
		status: true,
		message: responseData.message,
	};
};
export const createReview = async (data: z.infer<typeof reviewSchema>) => {
	const validatedData = reviewSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	try {
		const formData = new FormData();
		formData.append('rating', validatedData.rating.toString());
		formData.append('comment', validatedData.comment);
		formData.append('title', validatedData.title);
		formData.append('email', validatedData.email);
		const response = await fetch (
			`${process.env.NEXT_PUBLIC_API_URL}/businesses/${validatedData.business_id}/reviews/create/`,
			{
				method: 'POST',
				body: formData,
			}
		);
		const responseData = await response.json();
		if (responseData.success) {
			return {
				status: true,
				message: 'Review created successfully',
				data: responseData.data,
			};
		}
		return {
			status: false,
			message: responseData.errors.non_field_errors[0],
			data: null,
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message:
				error instanceof Error
					? error.message
					: 'Error occurred',
			data: null,
		};
	}
};