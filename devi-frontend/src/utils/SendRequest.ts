import { PUBLIC_API_URL } from '$env/static/public';

export default async function SendRequest<T>(
	uri: string,
	method: string,
	body?: string,
	contentType?: string,
	auth?: string
): Promise<result<T | undefined>> {
	const apiURL = PUBLIC_API_URL || 'http://localhost:3010';

	const headers = {
		'Content-Type': 'application/json',
		...(contentType ? { 'Content-Type': contentType } : {}),
		...(auth ? { Authorization: `Bearer ${auth}` } : {}),
	};

	const res = await fetch(`${apiURL}/${uri}`, {
		method,
		headers,
		body: body ? body : undefined,
		credentials: 'include'
	});
	const data: result<T | undefined> = await res.json();
	return data;
}
