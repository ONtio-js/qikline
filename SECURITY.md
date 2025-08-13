# Admin Dashboard Security Implementation

This document outlines the security measures implemented to protect the admin dashboard endpoints in the QikLine application.

## Security Features

### 1. Middleware Protection

-   **File**: `middleware.ts`
-   **Purpose**: Server-side route protection using Next.js middleware
-   **Features**:
    -   Protects all `/admin/dashboard/*` routes
    -   Checks for authentication tokens in cookies
    -   Redirects unauthenticated users to login page
    -   Prevents authenticated users from accessing login/register pages
    -   Maintains redirect URLs for better UX

### 2. Client-Side Authentication Guard

-   **File**: `src/components/auth/AuthGuard.tsx`
-   **Purpose**: Client-side authentication verification
-   **Features**:
    -   Wraps admin dashboard layout
    -   Checks authentication status on component mount
    -   Shows loading state during authentication check
    -   Redirects to login with current path as redirect parameter

### 3. Enhanced Token Management

-   **File**: `src/utils/token.ts`
-   **Purpose**: Secure token storage and retrieval
-   **Features**:
    -   Dual storage: localStorage (client-side) + cookies (server-side)
    -   Automatic token cleanup on logout
    -   Secure cookie settings with SameSite=Strict
    -   Fallback mechanism for token retrieval

### 4. Secure Logout Implementation

-   **File**: `src/app/admin/logout/page.tsx` and updated sidebar
-   **Purpose**: Proper session termination
-   **Features**:
    -   Clears all tokens (localStorage + cookies)
    -   Redirects to login page
    -   Prevents session hijacking

## Protected Routes

The following routes require authentication:

-   `/admin/dashboard`
-   `/admin/dashboard/bookings`
-   `/admin/dashboard/services`
-   `/admin/dashboard/customers`
-   `/admin/dashboard/analytics`
-   `/admin/dashboard/settings`
-   `/admin/dashboard/notification`

## Public Routes

The following routes are accessible without authentication:

-   `/login`
-   `/register`
-   `/admin` (admin signup)
-   `/auth/verify`
-   `/onboarding`
-   `/onboarding/role`
-   `/customers`

## Authentication Flow

1. **Unauthenticated User Access**:

    - User tries to access protected route
    - Middleware checks for access token in cookies
    - If no token found, redirects to `/login?redirect=<original_path>`
    - User logs in successfully
    - Redirected back to original intended destination

2. **Authenticated User Access**:

    - User has valid tokens
    - Middleware allows access to protected routes
    - AuthGuard component provides additional client-side protection
    - User can access all admin dashboard features

3. **Logout Process**:
    - User clicks logout in sidebar
    - All tokens are cleared (localStorage + cookies)
    - User is redirected to login page
    - Session is completely terminated

## Security Best Practices Implemented

1. **Multi-layer Protection**: Both server-side (middleware) and client-side (AuthGuard) protection
2. **Secure Token Storage**: Tokens stored in both localStorage and cookies for different access patterns
3. **Automatic Redirects**: Users are redirected to their intended destination after login
4. **Session Cleanup**: Complete token removal on logout
5. **Route Protection**: Comprehensive protection of all admin routes
6. **Loading States**: Proper loading indicators during authentication checks

## Technical Implementation Details

### Middleware Configuration

```typescript
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
```

### Token Management

-   Access tokens expire after 7 days
-   Refresh tokens expire after 30 days
-   Cookies use SameSite=Strict for CSRF protection
-   Automatic fallback between localStorage and cookies

### Error Handling

-   Graceful handling of authentication failures
-   Proper error messages for users
-   Automatic redirects on authentication errors

## Testing Security

To test the security implementation:

1. **Test Unauthenticated Access**:

    - Clear all cookies and localStorage
    - Try to access `/admin/dashboard`
    - Should be redirected to `/login`

2. **Test Authenticated Access**:

    - Login with valid credentials
    - Try to access `/admin/dashboard`
    - Should be allowed access

3. **Test Logout**:

    - Login and access dashboard
    - Click logout
    - Should be redirected to login page
    - Try to access dashboard again (should be blocked)

4. **Test Redirect After Login**:
    - Try to access protected route while logged out
    - Login successfully
    - Should be redirected to originally intended route

## Future Enhancements

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Role-based Access**: Add role-based permissions for different admin functions
3. **Session Timeout**: Implement automatic logout after inactivity
4. **Audit Logging**: Log authentication events for security monitoring
5. **Rate Limiting**: Implement rate limiting for login attempts
