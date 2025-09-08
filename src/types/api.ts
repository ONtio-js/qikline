export type ApiErrorMap = Record<
	string,
	string[] | Record<string, string[]> | string
>;

export interface ApiErrorResponse {
	error: ApiErrorMap;
}
