import type { Cookies } from '@sveltejs/kit';
import SendRequest from '../../../../utils/SendRequest';

export async function PUT({ request, cookies }: { request: Request; cookies: Cookies }) {
	const data = await request.json();
	const response = await SendRequest<User>(
		`users/${data.id}`,
		'PUT',
		JSON.stringify(data),
		'application/json',
		cookies.get('devi-actk')
	);
	return Response.json(response);
}
