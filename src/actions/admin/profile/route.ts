import { apiWrapper } from "@/actions/wrapper";
import { BusinessOwnerProfile } from "../../../../schema/schema";

export const updateProfile = async (formData: FormData) => {
	const validatedFields = BusinessOwnerProfile.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
	});

	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}
	const Data = {
		full_name: formData.get('name'),
		phone_number: formData.get('phone'),
	};
	console.log('Making API call with data:', Data);
	try {
		console.log('Testing endpoint existence...');
		const testResponse = await apiWrapper.get('/auth/profile/');
		console.log('GET /auth/profile/ response:', testResponse);

		// Then make the actual PATCH request
		const response = await apiWrapper.patch('/auth/profile/', Data);
		console.log('PATCH /auth/profile/ response:', response);

		console.log('API response:', response);
		if (response.success) {
			return {
				status: true,
				message: 'Profile updated successfully',
			};
		} else {
			return {
				status: false,
				message:
					response.error + ' hello ' || 'Failed to update profile',
			};
		}
	} catch (error: unknown) {
		console.log('Update profile error:', error);
	}
};
