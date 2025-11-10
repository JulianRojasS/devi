import SendRequest from '../../../utils/SendRequest';

export const load = async ({ cookies }) => {
	const user = await SendRequest<User>(`users/profile/me`, 'GET', undefined, undefined, cookies.get('devi-actk'));
	return {
		user
	};
};