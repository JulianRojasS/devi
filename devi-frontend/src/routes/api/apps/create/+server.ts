import SendRequest from "../../../../utils/SendRequest";

export async function POST({ request, cookies }) {
	const data = await request.json();
	const response = await SendRequest<Apps>('apps', 'POST', JSON.stringify(data), 'application/json', cookies.get('devi-actk'));
	return Response.json(response);
}