
import SendRequest from "../../../../utils/SendRequest";
import type { Cookies } from "@sveltejs/kit";

export async function PUT({ request, cookies, url }: { request: Request, cookies: Cookies, url: URL }) {
	const data = await request.json();
	const id = url.searchParams.get('id');
	if (!id) {
		return Response.json({ error: 'ID is required' }, { status: 400 });
	}
	const response = await SendRequest<Otps>(`otps/${id}`, 'PUT', JSON.stringify(data), 'application/json', cookies.get('devi-actk'));
	return Response.json(response);
}