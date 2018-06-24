import { payloadUsers } from "../actions";
import { adapter } from "../server";

export default async ({ socket, user: { admin, id } }) => {
  const { users: { getUsers = () => {} } = {} } = adapter;

  const users = await getUsers();

  socket.emit("action", payloadUsers({ data: users }));
};
