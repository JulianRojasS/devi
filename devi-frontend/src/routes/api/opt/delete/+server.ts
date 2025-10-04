import SendRequest from "../../../../utils/SendRequest";

export async function DELETE({ url, cookies }) {
	const id = url.searchParams.get('id');
	if (!id) {
		return Response.json({ error: 'ID is required' }, { status: 400 });
	}
	const response = await SendRequest<Otps>(`otps/${id}`, 'DELETE', undefined, undefined, cookies.get('devi-actk'));
	return Response.json(response);
}