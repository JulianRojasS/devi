import SendRequest from "../../../utils/SendRequest";

export const load = async ({ cookies }) => {
  const apps = await SendRequest<Apps[]>('apps', 'GET', undefined, undefined, cookies.get('devi-actk'))
  return {
    apps,
  };
};