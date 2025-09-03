const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';


const setCookie = (name: string, value: string, days: number = 7) => {
	if (typeof window !== 'undefined') {
		try {
			const expires = new Date();
			expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);


			let cookieString = `${name}=${encodeURIComponent(
				value
			)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;


			if (window.location.protocol === 'https:') {
				cookieString += ';secure';
			}

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

			if (window.location.protocol === 'https:') {
				cookieString += ';secure';
			}

			if (
				window.location.hostname !== 'localhost' &&
				window.location.hostname !== '127.0.0.1'
			) {
				cookieString += `;domain=${window.location.hostname}`;
			}

			document.cookie = cookieString;
			console.log('Cookie removed:', name);
		} catch (error) {
			console.error('Error removing cookie:', error);
		}
	}
};

const safeSetLocalStorage = (key: string, value: string): boolean => {
	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(key, value);
			return true;
		} catch (error) {
			console.error('localStorage failed, trying sessionStorage:', error);
			try {
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
			const value = localStorage.getItem(key);
			if (value !== null) return value;

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
			sessionStorage.removeItem(key);
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
		const localStorageSuccess =
			safeSetLocalStorage(TOKEN_KEY, accessToken) &&
			safeSetLocalStorage(REFRESH_TOKEN_KEY, refreshToken);

		setCookie(TOKEN_KEY, accessToken, 7);
		setCookie(REFRESH_TOKEN_KEY, refreshToken, 30);

		if (!localStorageSuccess) {
			console.warn('localStorage not available, using cookies only');
		} else {
			console.log('Tokens stored successfully in localStorage');
		}

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
		const cookieToken = getCookie(TOKEN_KEY);
		const localToken = safeGetLocalStorage(TOKEN_KEY);

		return cookieToken || localToken;
	}
	return null;
};

export const getRefreshToken = () => {
	if (typeof window !== 'undefined') {
		const localToken = safeGetLocalStorage(REFRESH_TOKEN_KEY);
		const cookieToken = getCookie(REFRESH_TOKEN_KEY);

		return localToken || cookieToken;
	}
	return null;
};

export const removeTokens = () => {
	console.log('removeTokens called, clearing all tokens...');

	if (typeof window !== 'undefined') {
		const localStorageRemoved = safeRemoveLocalStorage(TOKEN_KEY);
		const refreshTokenRemoved = safeRemoveLocalStorage(REFRESH_TOKEN_KEY);

		removeCookie(TOKEN_KEY);
		removeCookie(REFRESH_TOKEN_KEY);

		console.log('Token removal results:', {
			localStorageRemoved,
			refreshTokenRemoved,
			windowAvailable: typeof window !== 'undefined',
		});

		setTimeout(() => {
			const remainingAccessToken = getAccessToken();
			const remainingRefreshToken = getRefreshToken();
			console.log('Token removal verification:', {
				accessTokenRemaining: !!remainingAccessToken,
				refreshTokenRemaining: !!remainingRefreshToken,
				accessTokenLength: remainingAccessToken?.length,
				refreshTokenLength: remainingRefreshToken?.length,
			});
		}, 100);
	}
};


