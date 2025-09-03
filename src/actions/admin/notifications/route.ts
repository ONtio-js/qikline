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
