import { setUser } from "../actions";

export default async ({
  socket,
  user: { admin = false, client = false } = {}
}) => {
  // Console
  // return ;

  console.log('getUSer', admin, client);
  socket.emit(
    "action",
    setUser({
      admin,
      client
    })
  );
};

// export default async ({ user: { id = 0, admin = false, client = false } = {} }) =>
// ({ id, admin, client });
