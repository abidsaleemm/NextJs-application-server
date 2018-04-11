import { getUsers } from "../authUsers/local";
import { payloadUsers, fetchAction } from "../actions";
import { getUserProps } from "../authUsers";

export default async ({ socket, user: { admin, id } }) => {
  const users = await getUsers();

  await socket.emit(
    "action",
    payloadUsers({ data: users })
  );
  await socket.emit("action", fetchAction(false));
};
