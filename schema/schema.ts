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
export const businessSchema = z.object({
	name: z.string().min(1),
	category: z.enum(['SPA', 'HAIR_SALON', 'NAIL_SALON', 'MASSAGE', 'OTHER']),
	description: z.string().min(1),
	address: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
	country: z.string().min(1),
	phone_number: z.string().min(1),
	email: z.string().email({ message: 'Invalid email address' }),
	website: z.string().optional().nullable(),
	banner: z
		.array(
			z.object({
				image: z.string().min(1),
				id: z.string().min(1),
			})
		)
		.optional(),
	is_active: z.boolean(),
	business_hours: z.array(
		z.object({
			day_name: z.string().min(1),
			day: z.string().min(1),
			opening_time: z.string().min(1),
			closing_time: z.string().min(1),
			is_closed: z.boolean(),
		})
	),
	services: z.array(
		z.object({
			name: z.string().min(1),
			description: z.string().min(1),
			price: z.number().min(1),
			duration: z.number().min(1),
			category: z.string().min(1),
			category_display: z.string().min(1),
			is_active: z.boolean(),
		})
	),
});

export const createBusinessSchema = businessSchema.omit({
	services: true,
	business_hours: true,
});

export const updateBusinessSchema = businessSchema.omit({
	banner: true,
	services: true,
	is_active: true,
	business_hours: true,
});

export const businessHoursSchema = z.array(
	z.object({
		day: z.number().min(0).max(6),
		opening_time: z.string().min(1),
		closing_time: z.string().min(1),
		is_closed: z.boolean(),
	})
);

export const createBusinessServiceSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.string().min(1),
	duration: z.number().min(1),
	category: z.enum(['HAIRCUT', 'HAIR_COLOR', 'STYLING', 'TREATMENT', 'MAKEUP', 'COLORING', 'FACIAL', 'MASSAGE', 'MANICURE', 'PEDICURE', 'WAXING', 'OTHER']),
	is_active: z.boolean(),
});

export const updateBusinessServiceSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().min(1),
	duration: z.number().min(1),
	category: z.string().min(1),
	is_active: z.boolean(),
});
export const bookFormSchema = z.object({
	service: z.string().min(1),
	date: z.string().min(1),
	time: z.string().min(1),
	name: z.string().min(1),
	email: z.string().email({ message: 'Invalid email address' }),
	phone: z.string().min(10),
	notes: z.string().min(1),
});

export const BusinessOwnerProfile = z.object({
	name:z.string(),
	email:z.string().email(),
	phone:z.string(),
	role:z.string()
})