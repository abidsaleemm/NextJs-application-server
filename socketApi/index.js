import socketio from 'socket.io';
import projectState from './projectState';
import selectSeries from './selectSeries';
import selectStudy from './selectStudy';
import { queryProject } from '../projects';

// TODO Clean this up somehow
const socketActions = {
  projectState,
  selectSeries,
  selectStudy
};

// TODO Handle internal state changes

export default ({ server, passport, sessionMiddleWare = () => {} }) => {
  const io = socketio.listen(server);

  // This is used to cache state and merge
  io.use((socket, next) => sessionMiddleWare(socket.request, {}, next));

  // Handle socket connections
  io.on("connection", socket => {
    console.log("Connection " + socket.id);

    const { request: { session: { passport: { user } = {} } = {} } = {} } = socket;
    console.log('Socket user', user);

    // This validates parent window session
    // TODO Might be a more clean way to handle this
    if (user === undefined) {
      return;
    }

    // This is used for the frontend of the application
    socket.on("action", async ({ type, ...action }) => {
      const parseType = type.replace(/^(server\/)/, ""); // TODO Do we really need this. Can just leave in and rename functions?
      console.log("action.type", parseType);

      // TODO additional security check here for user at some point
      const { [parseType]: socketAction = () => { } } = socketActions;
      await socketAction({ socket, action });
    });

    socket.on("disconnect", error => {
      console.log("Disconnect " + socket.id, error);
    });
  });

  return io;
};