import { apiWrapper } from '@/actions/wrapper';

interface NotificationResponse {
	results: Array<{
		id: number;
		title: string;
		message: string;
		category: string;
		created_at: string;
		updated_at: string;
	}>;
}

export const getNotifications = async ({
	page,
	limit,
	category,
}: {
	page?: number;
	limit?: number;
	category?: string;
}) => {
	try {
		const response = await apiWrapper.get(
			`${process.env.NEXT_PUBLIC_API_URL}/notifications/`,
			{
				params: {
					page,
					page_size: limit,
					category,
				},
			}
		);
		return {
			status: true,
			message: 'Notifications fetched successfully',
			data: (response?.data as NotificationResponse)?.results || [],
		};
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to fetch notifications',
		};
	}
};

export const DeleteNotification = async (id: string) => {
	try {
		const response = await apiWrapper.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/`
		);
		if (response.success) {
			return {
				status: true,
				message: 'Notification deleted successfully',
			};
		} else {
			return {
				status: false,
				message: 'Failed to delete notification',
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to delete notification',
		};
	}
};

export const MarkReadNotification = async (id: string) => {
	try {
		const response = await apiWrapper.post(
			`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/read/`
		);
		if (response.success) {
			return {
				status: true,
				message: 'Notification marked as read successfully',
			};
		} else {
			return {
				status: false,
				message: 'Failed to mark notification as read',
			};
		}
	} catch (error) {
		console.log(error);
		return {
			status: false,
			message: 'Failed to mark notification as read',
		};
	}
};
