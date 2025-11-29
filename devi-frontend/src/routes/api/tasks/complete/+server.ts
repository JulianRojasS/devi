import type { Cookies } from "@sveltejs/kit";
import SendRequest from "../../../../utils/SendRequest";

export async function PUT({ cookies, url }: { cookies: Cookies, url: URL }) {
	const id = url.searchParams.get('id');
	if (!id) {
		return Response.json({ error: 'ID is required' }, { status: 400 });
	}
	const response = await SendRequest<Tasks>(`tasks/complete/${id}`, 'PUT', undefined, 'application/json', cookies.get('devi-actk'));
	return Response.json(response);
}