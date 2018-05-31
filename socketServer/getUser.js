import { setUser } from "../actions";

export default async ({
  socket,
  user: { admin = false, id = 0, name = "" } = {}
}) => {
  socket.emit(
    "action",
    setUser({
      admin,
      id,
      name
    })
  );
};
