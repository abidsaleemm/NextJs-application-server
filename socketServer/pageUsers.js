import { getUsers } from "../authUsers/local";
import { payloadUsers } from "../actions";

export default async ({ socket, user: { admin, id } }) => {
  const users = await getUsers();

  socket.emit("action", payloadUsers({ data: users }));
};
