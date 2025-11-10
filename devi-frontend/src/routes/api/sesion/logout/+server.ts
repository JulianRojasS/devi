import SendRequest from "../../../../utils/SendRequest";
import { redirect, type Cookies } from "@sveltejs/kit";

export async function GET({ cookies }: { cookies: Cookies }) {
	await SendRequest<Apps>(`users/logout`, 'POST', undefined, 'application/json', cookies.get('devi-actk'));
  cookies.delete('devi-actk', { path: '/' });
  cookies.delete('devi-rftk', { path: '/' });
	return redirect(302, '/');
}