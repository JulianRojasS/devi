import SendRequest from "../../../../utils/SendRequest";
import type { Cookies } from "@sveltejs/kit";

export async function GET({ url, cookies }: { url: URL, cookies: Cookies }) {
	const id = url.searchParams.get('id');
	const response = await SendRequest<Container[]>('docker/containers/' + id, 'GET', undefined, undefined, cookies.get('devi-actk'));
	return Response.json(response);
}