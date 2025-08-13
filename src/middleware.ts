import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
	'/admin/dashboard',
	'/admin/dashboard/bookings',
	'/admin/dashboard/services',
	'/admin/dashboard/customers',
	'/admin/dashboard/analytics',
	'/admin/dashboard/settings',
	'/admin/dashboard/notification',
];

// Define public routes that don't require authentication
// const publicRoutes = [
// 	'/login',
// 	'/register',
// 	'/admin', // admin signup page
// 	'/auth/verify',
// 	'/onboarding',
// 	'/onboarding/role',
// 	'/customers',
// 	'/debug-storage', // debug page for testing storage
// ];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the current path is a protected route
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	// Check if the current path is a public route
	// const isPublicRoute = publicRoutes.some((route) =>
	// 	pathname.startsWith(route)
	// );

	// Get the access token from cookies (more secure than localStorage for SSR)
	const accessToken = request.cookies.get('access_token')?.value;

	// If it's a protected route and user is not authenticated
	if (isProtectedRoute && !accessToken) {
		// Redirect to login page
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('redirect', pathname);
		return NextResponse.redirect(loginUrl);
	}

	// If user is authenticated and tries to access login/register pages
	if (accessToken && (pathname === '/login' || pathname === '/register')) {
		// Redirect to admin dashboard
		return NextResponse.redirect(new URL('/admin/dashboard', request.url));
	}

	// If user is authenticated and tries to access admin signup page
	if (accessToken && pathname === '/admin') {
		// Redirect to admin dashboard
		return NextResponse.redirect(new URL('/admin/dashboard', request.url));
	}

	// Continue with the request
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|public).*)',
	],
};
