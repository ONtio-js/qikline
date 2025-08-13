# API Wrapper Documentation

This document explains how to use the `ApiWrapper` class for handling authenticated API requests with automatic token refresh.

## Overview

The `ApiWrapper` is a singleton class that provides a centralized way to make authenticated API requests. It automatically:

-   Adds authentication headers to requests
-   Handles token refresh when access tokens expire
-   Queues failed requests during token refresh
-   Provides a consistent response format
-   Manages token storage

## Basic Usage

### Import the wrapper

```typescript
import { apiWrapper } from '@/actions/wrapper';
```

### Making Requests

The wrapper provides methods for all HTTP verbs:

```typescript
// GET request
const response = await apiWrapper.get('/endpoint/');

// POST request
const response = await apiWrapper.post('/endpoint/', { data: 'value' });

// PUT request
const response = await apiWrapper.put('/endpoint/', { data: 'value' });

// PATCH request
const response = await apiWrapper.patch('/endpoint/', { data: 'value' });

// DELETE request
const response = await apiWrapper.delete('/endpoint/');
```

### Response Format

All methods return a consistent response format:

```typescript
interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}
```

### Example Usage

```typescript
// Get user profile
const profileResponse = await apiWrapper.get('/business-owners/profile/');
if (profileResponse.success) {
	console.log('Profile:', profileResponse.data);
} else {
	console.error('Error:', profileResponse.error);
}

// Create a booking
const bookingResponse = await apiWrapper.post('/bookings/', {
	customer_id: '123',
	service_id: '456',
	date: '2024-01-15',
	time: '14:00',
});

if (bookingResponse.success) {
	console.log('Booking created:', bookingResponse.data);
} else {
	console.error('Failed to create booking:', bookingResponse.error);
}
```

## Authentication Management

### Setting Tokens After Login

```typescript
// After successful login
const loginResponse = await apiWrapper.post('/auth/login/', {
	email: 'user@example.com',
	password: 'password123',
});

if (loginResponse.success) {
	// Set tokens using the wrapper
	apiWrapper.setTokens(
		loginResponse.data.data.access,
		loginResponse.data.data.refresh
	);
}
```

### Checking Authentication Status

```typescript
// Check if user is authenticated
const isAuthenticated = apiWrapper.isAuthenticated();

// Get current tokens
const tokens = apiWrapper.getTokens();
console.log('Access token:', tokens.accessToken);
console.log('Refresh token:', tokens.refreshToken);
```

### Logout

```typescript
// Clear tokens on logout
apiWrapper.clearTokens();
```

## Automatic Token Refresh

The wrapper automatically handles token refresh when:

1. A request returns a 401 (Unauthorized) status
2. The access token has expired
3. A valid refresh token is available

### How it works:

1. **Request Interceptor**: Automatically adds the current access token to all requests
2. **Response Interceptor**: Catches 401 errors and attempts token refresh
3. **Queue Management**: Queues failed requests during refresh to retry them after
4. **Automatic Retry**: Retries the original request with the new token

### Example Flow:

```typescript
// This request will automatically handle token refresh if needed
const response = await apiWrapper.get('/protected-endpoint/');

// If the access token was expired:
// 1. Request fails with 401
// 2. Wrapper detects 401 and starts refresh process
// 3. Refresh token is used to get new access token
// 4. Original request is retried with new token
// 5. Response is returned as normal
```

## Advanced Usage

### Custom Headers

```typescript
const response = await apiWrapper.post('/upload/', formData, {
	headers: {
		'Content-Type': 'multipart/form-data',
	},
});
```

### Query Parameters

```typescript
const response = await apiWrapper.get('/bookings/', {
	params: {
		page: 1,
		limit: 10,
		status: 'confirmed',
	},
});
```

### Multiple Concurrent Requests

```typescript
const [bookings, profile, analytics] = await Promise.all([
	apiWrapper.get('/bookings/'),
	apiWrapper.get('/business-owners/profile/'),
	apiWrapper.get('/analytics/'),
]);
```

## Error Handling

The wrapper provides consistent error handling:

```typescript
try {
	const response = await apiWrapper.get('/endpoint/');

	if (response.success) {
		// Handle success
		console.log(response.data);
	} else {
		// Handle API error
		console.error('API Error:', response.error);
	}
} catch (error) {
	// Handle network or other errors
	console.error('Network Error:', error);
}
```

## Configuration

The wrapper uses the following configuration:

-   **Base URL**: `process.env.NEXT_PUBLIC_API_URL` or `https://qikline-backend.onrender.com/api/v1`
-   **Timeout**: 10 seconds
-   **Default Headers**: `Content-Type: application/json`
-   **Token Storage**: Uses the existing token utilities from `@/utils/token`

## Migration from Direct Axios

If you're currently using axios directly, here's how to migrate:

### Before (Direct Axios):

```typescript
import axios from 'axios';

const response = await axios.get('/api/endpoint/', {
	headers: {
		Authorization: `Bearer ${getAccessToken()}`,
	},
});
```

### After (Using Wrapper):

```typescript
import { apiWrapper } from '@/actions/wrapper';

const response = await apiWrapper.get('/endpoint/');
// Authentication is handled automatically
```

## Best Practices

1. **Always check response.success**: Handle both success and error cases
2. **Use TypeScript**: Define interfaces for your response data
3. **Handle errors gracefully**: Provide user-friendly error messages
4. **Set tokens after login**: Use `apiWrapper.setTokens()` after successful authentication
5. **Clear tokens on logout**: Use `apiWrapper.clearTokens()` when logging out

## Troubleshooting

### Common Issues:

1. **Tokens not being set**: Make sure to call `apiWrapper.setTokens()` after login
2. **401 errors persisting**: Check that refresh tokens are valid and not expired
3. **Requests not being retried**: Ensure the wrapper is being used for all authenticated requests

### Debug Mode:

You can check the current authentication status:

```typescript
const authStatus = apiWrapper.getTokens();
console.log('Current tokens:', authStatus);
```

## Examples

See `example-usage.ts` for comprehensive examples of how to use the wrapper for different scenarios.
