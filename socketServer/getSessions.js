import { setSessions } from "../actions";

export default async ({
  socket,
  sessions
  //   user: { role = "user", id = 0, name = "", teams } = {}
}) => {
  socket.emit("action", setSessions(sessions));
};
