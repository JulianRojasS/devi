import SendRequest from '../../../utils/SendRequest';

export const load = async ({ cookies }) => {
	const otps = await SendRequest<Otps[]>(
		'otps',
		'GET',
		undefined,
		undefined,
		false,
		cookies.get('devi-actk')
	);
	return {
		otps
	};
};
