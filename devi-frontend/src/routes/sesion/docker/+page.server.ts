import SendRequest from '../../../utils/SendRequest';

export const load = async ({ cookies }) => {
	const dockers = await SendRequest<Docker[]>(`docker`, 'GET', undefined, undefined, cookies.get('devi-actk'));
	return {
		dockers
	};
};