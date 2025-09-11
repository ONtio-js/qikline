import { useEffect, useState } from 'react';

export function useNetworkStatus() {
	const [isOnline, setIsOnline] = useState<boolean>(
		typeof navigator !== 'undefined' ? navigator.onLine : true
	);

	useEffect(() => {
		function handleOnline() {
			setIsOnline(true);
		}
		function handleOffline() {
			setIsOnline(false);
		}

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return { isOnline, isOffline: !isOnline };
}
