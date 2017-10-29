import { setUser } from "../actions";

export default async ({
  socket,
  user: { admin = false, client = false } = {}
}) => {
  socket.emit(
    "action",
    setUser({
      admin,
      client
    })
  );
};
