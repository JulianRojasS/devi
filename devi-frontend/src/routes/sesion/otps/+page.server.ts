import SendRequest from '../../../utils/SendRequest';

export const load = async ({ cookies }) => {
	const otps = await SendRequest<Otps[]>(
		'otps',
		'GET',
		undefined,
		undefined,
		cookies.get('devi-actk')
	);
	const apps = await SendRequest<Apps[]>(
		'apps',
		'GET',
		undefined,
		undefined,
		cookies.get('devi-actk')
	);
	return {
		otps,
		apps
	};
};
