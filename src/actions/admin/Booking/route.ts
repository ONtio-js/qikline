import { apiWrapper } from "@/actions/wrapper";

export const getBookings = async (accessToken: string, page: number, limit: number) => {
	const response = await apiWrapper.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings/business-bookings/`, {
        params: {
            page,
            limit,
        },
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data;

};