import { z } from 'zod';
import { bookFormSchema } from '../../../schema/schema';

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
			message: 'appointment made successful',
		};
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : 'Error occurred',
		};
	}
};
