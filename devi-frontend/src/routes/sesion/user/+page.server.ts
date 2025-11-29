import SendRequest from '../../../utils/SendRequest';

export const load = async ({ cookies }) => {
	const user = await SendRequest<User>(
		`users/profile/me`,
		'GET',
		undefined,
		undefined,
		cookies.get('devi-actk')
	);
	const githubRepositories = await SendRequest<GithubRepository[]>(
		`users/github/repositories`,
		'GET',
		undefined,
		undefined,
		cookies.get('devi-actk')
	);
	return {
		user,
		githubRepositories
	};
};
