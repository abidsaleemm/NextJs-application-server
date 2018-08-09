import { payloadUsers } from "../actions";
import { adapter } from "../server";

export default async ({ socket, user: { role, id , teams} }) => {
  const { users: { getUsers = () => {} } = {} } = adapter;

  const users = await getUsers();

  socket.emit("action", payloadUsers({ data: users }));
};
