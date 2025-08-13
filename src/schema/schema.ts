import { z } from 'zod';

export const adminSchema = z
	.object({
		name: z.string().min(1),
		email: z.string().email(),
		phone: z.string().min(10),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
});

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, { message: 'Token is required' }),
		password: z.string().min(1, { message: 'Password is required' }),
		confirmPassword: z.string().min(1, { message: 'Password is required' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export const verifySchema = z.object({
	token: z.string().length(6, { message: 'Token must be exactly 6 digits' }),
	email: z.string().email({ message: 'Invalid email address' }),
});

export const serviceSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().min(1),
	duration: z.number().min(1),
	category: z.string().min(1),
});
