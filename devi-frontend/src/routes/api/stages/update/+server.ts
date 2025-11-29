import type { Cookies } from '@sveltejs/kit';
import SendRequest from '../../../../utils/SendRequest';

export async function PUT({
	request,
	cookies,
	url
}: {
	request: Request;
	cookies: Cookies;
	url: URL;
}) {
	const data = await request.json();
	const id = url.searchParams.get('id');
	if (!id) {
		return Response.json({ error: 'ID is required' }, { status: 400 });
	}
	const response = await SendRequest<Stages>(
		`stages/${id}`,
		'PUT',
		JSON.stringify(data),
		'application/json',
		cookies.get('devi-actk')
	);
	return Response.json(response);
}
