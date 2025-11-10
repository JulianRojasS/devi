import SendRequest from "../../../../utils/SendRequest";
import type { Cookies } from "@sveltejs/kit";

export async function POST({ request, cookies }: { request: Request, cookies: Cookies }) {
	const data = await request.json();
	const response = await SendRequest<Docker>('docker', 'POST', JSON.stringify(data), 'application/json', cookies.get('devi-actk'));
	return Response.json(response);
}