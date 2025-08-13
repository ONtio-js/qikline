'use server';

import { apiWrapper } from '../../wrapper';
import {
	adminSchema,
	forgotPasswordSchema,
	loginSchema,
	resetPasswordSchema,
	verifySchema,
} from '../../../../schema/schema';

export const signup = async (formData: FormData) => {
	const validatedFields = adminSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	});

	try {
		if (!validatedFields.success) {
			return {
				status: false,
				error: validatedFields.error.flatten().fieldErrors,
			};
		}
		const response = await apiWrapper.post('/auth/register/', {
			full_name: validatedFields.data.name,
			email: validatedFields.data.email,
			password: validatedFields.data.password,
			confirm_password: validatedFields.data.confirmPassword,
			phone_number: validatedFields.data.phone,
			role: 'BUSINESS_OWNER',
		});

		if (response.success) {
			return {
				status: true,
				message: 'Business owner signed up successfully',
			};
		} else {
			return {
				status: false,
				message: response.error || 'Failed to sign up',
			};
		}
	} catch (error: unknown) {
		console.log('Signup error:', error);
		return {
			status: false,
			message: 'Failed to sign up. Please try again.',
		};
	}
};

export const login = async (email: string, password: string) => {
	const validatedFields = loginSchema.safeParse({
		email,
		password,
	});
	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const response = await apiWrapper.post('/auth/login/', {
			email: validatedFields.data.email,
			password: validatedFields.data.password,
		});

		if (response.success && response.data) {
			// Set tokens using the wrapper
			const responseData = response.data as {
				data: { access: string; refresh: string };
			};
			apiWrapper.setTokens(
				responseData.data.access,
				responseData.data.refresh
			);

			return {
				status: true,
				message: 'Login successful',
				data: {
					access_token: responseData.data.access,
					refresh_token: responseData.data.refresh,
				},
			};
		} else {
			return {
				status: false,
				message: response.error || 'Invalid response from server',
			};
		}
	} catch (error: unknown) {
		console.log('Login error:', error);
		return {
			status: false,
			message: 'Login failed. Please try again.',
		};
	}
};

export const verifyEmail = async (token: string, email: string) => {
	const validatedFields = verifySchema.safeParse({
		token,
		email,
	});

	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const response = await apiWrapper.post('/auth/verify-email/', {
			email: validatedFields.data.email,
			otp: validatedFields.data.token,
		});

		if (response.success) {
			return {
				status: true,
				message: 'Email verified successfully',
			};
		} else {
			const responseData = response.data as { message?: string };
			return {
				status: false,
				message: responseData.message || 'Failed to verify email',
			};
		}
	} catch (error: unknown) {
		console.log('Verify email error:', error);
		return {
			status: false,
			message: 'Failed to verify email. Please try again.',
		};
	}
};

export const resetPassword = async (formData: FormData) => {
	const validatedFields = resetPasswordSchema.safeParse({
		token: formData.get('token'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	});

	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const response = await apiWrapper.post('/auth/reset-password/', {
			token: validatedFields.data.token,
			password: validatedFields.data.password,
			confirm_password: validatedFields.data.confirmPassword,
		});

		if (response.success) {
			return {
				status: true,
				message: 'Password reset successfully',
			};
		} else {
			return {
				status: false,
				message: response.error || 'Failed to reset password',
			};
		}
	} catch (error: unknown) {
		console.log('Reset password error:', error);
		return {
			status: false,
			message: 'Failed to reset password. Please try again.',
		};
	}
};

export const sendRequestPassword = async (formData: FormData) => {
	const validatedFields = forgotPasswordSchema.safeParse({
		email: formData.get('email'),
	});
	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}
	try {
		const response = await apiWrapper.post('/auth/forgot-password/', {
			email: validatedFields.data.email,
		});

		if (response.success) {
			return {
				status: true,
				message: 'Request password sent successfully',
			};
		} else {
			return {
				status: false,
				message: response.error || 'Failed to send request password',
			};
		}
	} catch (error: unknown) {
		console.log('Request password error:', error);
		return {
			status: false,
			message: 'Failed to send request password. Please try again.',
		};
	}
};

export const resendOTP = async (email: string) => {
	try {
		const response = await apiWrapper.post('/auth/resend-otp/', {
			email: email,
		});

		if (response.success) {
			return { status: true, message: 'OTP sent successfully' };
		} else {
			return {
				status: false,
				message: response.error || 'Failed to send OTP',
			};
		}
	} catch {
		return {
			status: false,
			message: 'Failed to send OTP',
		};
	}
};
