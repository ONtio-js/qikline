import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
	const dateObj = new Date(date);
	const formattedDate = dateObj.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	return formattedDate;
};

export const formatTime = (time: string) => {
	const timeObj = new Date(time);
	const formattedTime = timeObj.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return formattedTime;
};

export const formatDuration = (duration: number) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return `${hours}h ${minutes}m`;
};

export const FormatDateDuration = (date: string) => {
	const dateObj = new Date(date);
	const currentDate = new Date();
	const timeDifference = currentDate.getTime() - dateObj.getTime();

	// Convert to days, hours, minutes
	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor(
		(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
	);

	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	} else if (minutes > 0) {
		return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
	} else {
		return 'Just now';
	}
};
