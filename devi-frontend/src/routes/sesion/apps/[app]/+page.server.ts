import SendRequest from '../../../../utils/SendRequest';

export const load = async ({ cookies, params }) => {
	const appId = params.app;
	const app = await SendRequest<Apps | undefined>(
		`apps/${appId}`,
		'GET',
		undefined,
		undefined,
		cookies.get('devi-actk')
	);
	return {
		app
	};
};
