const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Cookie utilities for server-side access
const setCookie = (name: string, value: string, days: number = 7) => {
	if (typeof window !== 'undefined') {
		try {
			const expires = new Date();
			expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

			// Build cookie string with proper security settings
			let cookieString = `${name}=${encodeURIComponent(
				value
			)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;

			// Add secure flag if on HTTPS
			if (window.location.protocol === 'https:') {
				cookieString += ';secure';
			}

			// Add domain if not localhost
			if (
				window.location.hostname !== 'localhost' &&
				window.location.hostname !== '127.0.0.1'
			) {
				cookieString += `;domain=${window.location.hostname}`;
			}

			document.cookie = cookieString;
			console.log(
				'Cookie set:',
				name,
				'with value length:',
				value.length
			);
		} catch (error) {
			console.error('Error setting cookie:', error);
		}
	}
};

const getCookie = (name: string): string | null => {
	if (typeof window !== 'undefined') {
		try {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) {
				const cookieValue = parts.pop()?.split(';').shift();
				return cookieValue ? decodeURIComponent(cookieValue) : null;
			}
		} catch (error) {
			console.error('Error getting cookie:', error);
		}
	}
	return null;
};

const removeCookie = (name: string) => {
	if (typeof window !== 'undefined') {
		try {
			let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;

			// Add secure flag if on HTTPS
			if (window.location.protocol === 'https:') {
				cookieString += ';secure';
			}

			document.cookie = cookieString;
		} catch (error) {
			console.error('Error removing cookie:', error);
		}
	}
};

// Safe localStorage operations with error handling
const safeSetLocalStorage = (key: string, value: string): boolean => {
	if (typeof window !== 'undefined') {
		try {
			// Try localStorage first
			localStorage.setItem(key, value);
			return true;
		} catch (error) {
			console.error('localStorage failed, trying sessionStorage:', error);
			try {
				// Fallback to sessionStorage
				sessionStorage.setItem(key, value);
				return true;
			} catch (sessionError) {
				console.error('sessionStorage also failed:', sessionError);
				return false;
			}
		}
	}
	return false;
};

const safeGetLocalStorage = (key: string): string | null => {
	if (typeof window !== 'undefined') {
		try {
			// Try localStorage first
			const value = localStorage.getItem(key);
			if (value !== null) return value;

			// Fallback to sessionStorage
			return sessionStorage.getItem(key);
		} catch (error) {
			console.error(
				'Error getting from localStorage, trying sessionStorage:',
				error
			);
			try {
				return sessionStorage.getItem(key);
			} catch (sessionError) {
				console.error('sessionStorage also failed:', sessionError);
				return null;
			}
		}
	}
	return null;
};

const safeRemoveLocalStorage = (key: string): boolean => {
	if (typeof window !== 'undefined') {
		try {
			localStorage.removeItem(key);
			sessionStorage.removeItem(key); // Also remove from sessionStorage
			return true;
		} catch (error) {
			console.error('Error removing from localStorage:', error);
			return false;
		}
	}
	return false;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
	console.log('setTokens called with:', {
		accessTokenLength: accessToken?.length,
		refreshTokenLength: refreshToken?.length,
		hasAccessToken: !!accessToken,
		hasRefreshToken: !!refreshToken,
		windowAvailable: typeof window !== 'undefined',
	});

	if (typeof window !== 'undefined') {
		// Store in localStorage for client-side access
		const localStorageSuccess =
			safeSetLocalStorage(TOKEN_KEY, accessToken) &&
			safeSetLocalStorage(REFRESH_TOKEN_KEY, refreshToken);

		// Store in cookies for server-side access
		setCookie(TOKEN_KEY, accessToken, 7);
		setCookie(REFRESH_TOKEN_KEY, refreshToken, 30);

		// Log success/failure for debugging
		if (!localStorageSuccess) {
			console.warn('localStorage not available, using cookies only');
		} else {
			console.log('Tokens stored successfully in localStorage');
		}

		// Verify storage immediately
		setTimeout(() => {
			const storedAccessToken = getAccessToken();
			const storedRefreshToken = getRefreshToken();
			console.log('setTokens verification:', {
				storedAccessToken: !!storedAccessToken,
				storedRefreshToken: !!storedRefreshToken,
				accessTokenLength: storedAccessToken?.length,
				refreshTokenLength: storedRefreshToken?.length,
			});
		}, 10);
	} else {
		console.warn('setTokens called on server-side, tokens not stored');
	}
};

export const getAccessToken = () => {
	if (typeof window !== 'undefined') {
		// Try localStorage first, then cookies
		const localToken = safeGetLocalStorage(TOKEN_KEY);
		const cookieToken = getCookie(TOKEN_KEY);

		return localToken || cookieToken;
	}
	return null;
};

export const getRefreshToken = () => {
	if (typeof window !== 'undefined') {
		// Try localStorage first, then cookies
		const localToken = safeGetLocalStorage(REFRESH_TOKEN_KEY);
		const cookieToken = getCookie(REFRESH_TOKEN_KEY);

		return localToken || cookieToken;
	}
	return null;
};

export const removeTokens = () => {
	if (typeof window !== 'undefined') {
		// Remove from localStorage
		safeRemoveLocalStorage(TOKEN_KEY);
		safeRemoveLocalStorage(REFRESH_TOKEN_KEY);

		// Remove from cookies
		removeCookie(TOKEN_KEY);
		removeCookie(REFRESH_TOKEN_KEY);
	}
};

// Debug function to check storage status
export const debugStorage = () => {
	if (typeof window !== 'undefined') {
		console.log('=== Storage Debug ===');
		console.log('Window object available:', typeof window !== 'undefined');
		console.log(
			'Document object available:',
			typeof document !== 'undefined'
		);
		console.log(
			'localStorage available:',
			typeof localStorage !== 'undefined'
		);
		console.log(
			'document.cookie available:',
			typeof document !== 'undefined' &&
				typeof document.cookie !== 'undefined'
		);

		if (typeof localStorage !== 'undefined') {
			try {
				console.log(
					'localStorage access_token:',
					safeGetLocalStorage(TOKEN_KEY)
				);
				console.log(
					'localStorage refresh_token:',
					safeGetLocalStorage(REFRESH_TOKEN_KEY)
				);
			} catch (error) {
				console.error('Error reading localStorage:', error);
			}
		}

		if (
			typeof document !== 'undefined' &&
			typeof document.cookie !== 'undefined'
		) {
			try {
				console.log('cookie access_token:', getCookie(TOKEN_KEY));
				console.log(
					'cookie refresh_token:',
					getCookie(REFRESH_TOKEN_KEY)
				);
				console.log('All cookies:', document.cookie);
			} catch (error) {
				console.error('Error reading cookies:', error);
			}
		}

		console.log('===================');
	} else {
		console.log('=== Storage Debug ===');
		console.log('Window object NOT available (server-side)');
		console.log('===================');
	}
};

// Test function to verify token storage
export const testTokenStorage = () => {
	console.log('=== Testing Token Storage ===');

	// Test setting tokens
	const testAccessToken = 'test-access-token-' + Date.now();
	const testRefreshToken = 'test-refresh-token-' + Date.now();

	console.log('Setting test tokens...');
	setTokens(testAccessToken, testRefreshToken);

	// Wait a bit and then verify
	setTimeout(() => {
		const retrievedAccessToken = getAccessToken();
		const retrievedRefreshToken = getRefreshToken();

		console.log('Test results:', {
			accessTokenMatch: retrievedAccessToken === testAccessToken,
			refreshTokenMatch: retrievedRefreshToken === testRefreshToken,
			retrievedAccessToken: retrievedAccessToken,
			retrievedRefreshToken: retrievedRefreshToken,
			testAccessToken: testAccessToken,
			testRefreshToken: testRefreshToken,
		});

		// Clean up test tokens
		removeTokens();
		console.log('Test tokens cleaned up');
		console.log('=== Test Complete ===');
	}, 100);
};
