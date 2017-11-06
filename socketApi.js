import Server from "socket.io";
import * as server from "./socketServer";
import * as editor from "./socketEditor";

const actionHandlers = {
  server,
  editor
};

// TODO Handle internal state changes
export default ({
  server,
  passport,
  sessionMiddleWare = () => {}
}) => {
  const socketio = new Server({
    pingTimeout: 120000,
    transports: ["websocket"],
    pingInterval: 30000
  });

  const io = socketio.listen(server);

  // Pass down session from passportjs
  io.use((socket, next) =>
    sessionMiddleWare(socket.request, {}, next)
  );

  // Handle socket connections
  io.on("connection", socket => {
    console.log("Connection " + socket.id);

    const {
      request: { session: { passport: { user } = {} } = {} } = {}
    } = socket;

    // This validates user session
    // TODO Might be a more clean way to handle this
    if (user === undefined) {
      return;
    }

    socket.on("action", async ({ type = "", ...action }) => {
      const [prefix, parseType] = type.split("/"); // TODO Could break if action name contains more /
      const {
        [prefix]: { [parseType]: actionHandler = () => {} } = {}
      } = actionHandlers;

      console.log("action", prefix, parseType);
      await actionHandler({
        socket,
        action: { ...action, type },
        user
      });
    });

    socket.on("disconnect", error => {
      console.log("Disconnect " + socket.id, error);
    });
  });

  return io;
};
