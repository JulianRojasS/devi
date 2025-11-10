import type { Cookies } from "@sveltejs/kit";
import SendRequest from "../../../../utils/SendRequest";

export async function DELETE({ url, cookies }: { url: URL, cookies: Cookies }) {
	const id = url.searchParams.get('id'); /// obtain from url params example: /api/tasks/delete?id=123
    console.log(id);
	if (!id) {
		return Response.json({ error: 'ID is required' }, { status: 400 });
	}
	const response = await SendRequest<Tasks>(`stages/${id}`, 'DELETE', undefined, undefined, cookies.get('devi-actk'));
	return Response.json(response);
}