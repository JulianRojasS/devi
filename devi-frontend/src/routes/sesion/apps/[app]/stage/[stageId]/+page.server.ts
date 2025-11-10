import SendRequest from "../../../../../../utils/SendRequest";

export const load = async ({ params, cookies }) => {
  const { stageId } = params;
  const stage = await SendRequest<Stages>(
    `stages/${stageId}`,
    'GET',
    undefined,
    undefined,
    cookies.get('devi-actk')
  );
  const tasks = await SendRequest<Tasks[]>(
    `tasks/stage/${stageId}`,
    'GET',
    undefined,
    undefined,
    cookies.get('devi-actk')
  );
  const users = await SendRequest<User[]>(
    `users`,
    'GET',
    undefined,
    undefined,
    cookies.get('devi-actk')
  );
  return {
    stage,
    tasks,
    users,
  };
};