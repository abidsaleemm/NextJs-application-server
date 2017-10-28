import socketio from "socket.io";
// import dataUriToBuffer from 'data-uri-to-buffer';
// import { Readable } from 'stream';

// TODO Move into actions directory
// import projectState from "./projectState";
// import selectSeries from "./selectSeries";
// import selectStudy from "./selectStudy";
// import renderFrame from "./renderFrame";
// import renderDone from "./renderDone";
// import renderAudio from "./renderAudio";

// import { queryProject } from "../projects";
// import { put as uploadPut } from '../upload';

// TODO Works but clean this up somehow
// const socketActions = {
//   projectState,
//   selectSeries,
//   selectStudy,
//   renderFrame,
//   renderDone,
//   renderAudio
// };

import * as server from "./socketServer";
import * as view3D from "./socketEditor";

const actionHandlers = {
  server,
  view3D
};

// TODO Handle internal state changes
// Implement Redux?
export default ({
  server,
  passport,
  sessionMiddleWare = () => {}
}) => {
  const io = socketio.listen(server);

  // Pass down session from passportjs
  io.use((socket, next) =>
    sessionMiddleWare(socket.request, {}, next)
  );

  // Handle socket connections
  io.on("connection", socket => {
    console.log("Connection " + socket.id);

    // console.log('socket.handshake', socket.handshake.address);

    const {
      request: { session: { passport: { user } = {} } = {} } = {}
    } = socket;
    console.log("Socket user", user);

    // This validates user session
    // TODO Might be a more clean way to handle this
    if (user === undefined) {
      return;
    }

    // Non redux based actions
    // socket.on("uploadPut", async ({ studyUID, name, data }, done) => {
    //   const decoded = dataUriToBuffer(data);

    //   const stream = new Readable;
    //   stream.push(decoded);
    //   stream.push(null);

    //   await uploadPut({ studyUID, name, stream });
    //   done("back");
    // });

    // This is used for the frontend of the application which uses redux socket.io middleware
    socket.on("action", async ({ type = "", ...action }) => {
      const [prefix, parseType] = type.split("/"); // TODO Could break if action name contains more /

      // if (prefix
      // const prefix = type.indexOf.split('/')[0];
      // const parseType = []
      // console.log("prefix", prefix);

      // const parseType = type.replace(/^(server\/)/, ""); // TODO Do we really need this. Can just leave in and rename functions?
      // console.log("action.type", parseType);

      // actionHandlers[prefix];

      // TODO additional security check here for user at some point?
      const { [prefix]: { [parseType]: actionHandler = () => {} } = {} } = actionHandlers;

      // console.log("actionHandler", actionHandler);

      // TODO Handle with a return value instead
      await actionHandler({ socket, action: { ...action, type }, user });
    });

    socket.on("disconnect", error => {
      console.log("Disconnect " + socket.id, error);
    });
  });

  return io;
};
