import { setUser } from "../actions";

export default async ({
  socket,
  user: { role = "user", id = 0, name = "", teams } = {}
}) => {
  socket.emit(
    "action",
    setUser({
      role,
      id,
      name,
      teams
    })
  );
};
