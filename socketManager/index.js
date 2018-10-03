import Server from "socket.io";

// Import socket handlers
import * as server from "../socketServer";
import * as editor from "../socketEditor";

import { rendersWatcher, projectsWatcher } from "./watchers";
import { adapter } from "../server";
import { setSessions } from "../actions";

const actionHandlers = {
  ...server,
  ...editor
  //   server,
  //   editor
};

// TODO Handle internal state changes
export default ({ server, passport, sessionMiddleWare = () => {} }) => {
  let sessions = {};

  const socketio = new Server({
    pingTimeout: 60000,
    transports: ["websocket"],
    pingInterval: 10000
  });

  const io = socketio.listen(server);

  // Pass down session from passportjs
  io.use((socket, next) => sessionMiddleWare(socket.request, {}, next));

  // Compose db watchers
  //   rendersWatcher({ io, adapter });
  //   projectsWatcher({ io, adapter });

  // Handle socket connections
  io.on("connection", socket => {
    console.log("Connection " + socket.id);

    const {
      request: { session: { passport: { user } = {} } = {} } = {}
    } = socket;

    // This validates user session
    // TODO Might be a more clean way to handle this.  Can use middleware? WG
    if (user === undefined && !process.env.RENDER) {
      console.log("Connection blocked. No matching passport session.");
      return;
    }

    socket.emit("action", setSessions(sessions));

    // TODO Add socket action for leaving room.

    // Handle redux actions here
    socket.on("action", async ({ type = "", ...action }) => {
      const [prefix, parseType] = type.split("/"); // TODO Could break if action name contains more /
      const { [parseType]: actionHandler = () => {} } = actionHandlers;

      // TODO This is kinda a hack but works well for now.  If from the editor join a room.
      const { studyUID } = action;

      if (studyUID) {
        const { [studyUID]: session } = sessions;

        if (prefix === "editor") {
          if (!session) {
            // Create new session
            sessions = {
              [studyUID]: {
                userName: (user || { name: "Rendering" }).name,
                socketId: socket.id
              }
            };
          } else {
            const { socketId, userName } = session;

            if (socketId !== socket.id) {
              console.log("Session Already in use", socket.id);

              socket.emit("action", {
                type: "ERROR",
                value: true,
                message: `This project is already in use by ${userName}. Please return to Projects listing.`
              });

              // Bailout
              return;
            }
          }

          // TODO Update everyones sessions list
          socket.broadcast.emit("action", setSessions(sessions));
        }
      }

      await actionHandler({
        socket,
        sessions,
        io,
        action: { ...action, type },
        user
      });
    });

    socket.on("disconnect", error => {
      console.log("Disconnect " + socket.id, error);

      sessions = Object.entries(sessions).reduce(
        (a, [k, v = {}]) => (v.socketId === socket.id ? a : { ...a, [k]: v }),
        {}
      );

      //   console.log("disconnect sessions", sessions);

      // TODO Update everyones sessions list
      socket.broadcast.emit("action", setSessions(sessions));
    });
  });

  return io;
};
