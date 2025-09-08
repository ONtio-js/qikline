import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ApiErrorMap } from '@/types/api';

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

// Returns a single human-readable error message regardless of input shape
export function handleApiErrors(errors: unknown): string {
	// Normalize a field name to a title (e.g., "website_url" -> "Website url")
	const toTitle = (field: string) => {
		const spaced = field.replace(/[_-]+/g, ' ').trim();
		return spaced.charAt(0).toUpperCase() + spaced.slice(1);
	};

	// 1) Direct primitives
	if (typeof errors === 'string') return errors;
	if (Array.isArray(errors)) {
		const first = errors.find((m) => typeof m === 'string');
		if (first) return first as string;
	}

	// 2) Axios-like error objects -> unwrap response.data if present
	if (errors && typeof errors === 'object') {
		const errObj = errors as Record<string, unknown> & {
			response?: { data?: unknown };
			data?: unknown;
		};

		const data = errObj?.response?.data ?? errObj?.data ?? errors;

		// Helper: try extracting map from common keys
		const extractMap = (obj: unknown): ApiErrorMap | null => {
			if (!obj || typeof obj !== 'object') return null;
			const o = obj as Record<string, unknown>;
			const candidates: Array<unknown> = [
				o.errors,
				o.error,
				// Some APIs place field errors at top level (e.g., { website: [...] })
				obj,
			];
			for (const candidate of candidates) {
				if (
					candidate &&
					typeof candidate === 'object' &&
					!Array.isArray(candidate)
				) {
					return candidate as ApiErrorMap;
				}
			}
			return null;
		};

		const map = extractMap(data);
		if (map) {
			const entries = Object.entries(map);
			if (entries.length > 0) {
				const [field, value] = entries[0];
				if (typeof value === 'string') {
					return field ? `${toTitle(field)}: ${value}` : value;
				}
				if (Array.isArray(value)) {
					const firstMsg = value.find(
						(m) => typeof m === 'string'
					) as string | undefined;
					if (firstMsg)
						return field
							? `${toTitle(field)}: ${firstMsg}`
							: firstMsg;
				}
				if (value && typeof value === 'object') {
					const nestedValues = Object.values(
						value as Record<string, string[] | string>
					);
					const nestedFirst = nestedValues[0];
					if (typeof nestedFirst === 'string') {
						return field
							? `${toTitle(field)}: ${nestedFirst}`
							: nestedFirst;
					}
					if (Array.isArray(nestedFirst)) {
						const firstMsg = nestedFirst.find(
							(m) => typeof m === 'string'
						) as string | undefined;
						if (firstMsg)
							return field
								? `${toTitle(field)}: ${firstMsg}`
								: firstMsg;
					}
				}
			}
		}

		// 3) Fallback to common message keys
		const commonMessage =
			(data as Record<string, unknown>)?.message ??
			(data as Record<string, unknown>)?.detail ??
			(errObj as Record<string, unknown>)?.message;
		if (
			typeof commonMessage === 'string' &&
			commonMessage.trim().length > 0
		) {
			return commonMessage;
		}
	}

	return 'An unexpected error occurred';
}
