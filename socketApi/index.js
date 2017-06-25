import socketio from 'socket.io';
// import passportSocketIo from "passport.socketio";
import projectState from './projectState';
import selectSeries from './selectSeries';
import selectStudy from './selectStudy';

export projectState from './projectState';
export selectSeries from './selectSeries';
export selectStudy from './selectStudy';

import * as socketActions from './index';

// const actions = {
//   projectState,
//   selectSeries
//   selectStudy
// }

export default ({ server, passport }) => {
  const io = socketio.listen(server);
  // const io = require("socket.io").listen(server);

  // io.use(function(socket, next) {
  //   sessionMiddleWare(socket.request, socket.request.res, next);
  // });

  // io.use((socket, next) => {
  // sessionMiddleWare(socket.request, {}, next);
  // });

  // io.use(cookieParserSocket());

  // io.use(
  //   passportSocketIo.authorize({
  //     // passport,
  //     cookieParser: cookieParser(),
  //     // name: 'my.connect.sid',
  //     key: "express.sid",
  //     secret: "session_secret", // the session_secret to parse the cookie
  //     store: sessionStore,
  //     success: (data, accept) => {
  //       console.log("successful connection to socket.io");
  //       accept(null, true);
  //     },
  //     fail: (data, message, error, accept) => {
  //       // if(error)
  //       // throw new Error(message);
  //       console.log("failed connection to socket.io:", message);

  //       // We use this callback to log all of our failed connections.
  //       accept(null, false);
  //     }
  //   })
  // );

  // Handle socket connections
  io.on("connection", socket => {
    console.log("Connection " + socket.id);
    // console.log("user socketio", socket.handshake);

    // This is used for the frontend of the application
    socket.on("action", ({ type, ...action }) => {
      const parseType = type.replace(/^(server\/)/, ""); // TODO Do we really need this. Can just leave in and rename functions?
      console.log("action.type", parseType);

      // TODO check security token here
      const { [parseType]: socketAction = () => { } } = socketActions;
      socketAction({ socket, action });
    });

    // TODO cut up into individual files
    // socket.on("queryStudies", () => {
    //   queryStudies().then(studies => {
    //     socket.emit("queryStudies", studies);
    //     // console.log('socket.io studies', studies);
    //   });
    // });

    socket.on("disconnect", error => {
      console.log("Disconnect " + socket.id, error);
    });
  });

  return io;
};

// import {
//   queryStudies
// } from '../dicom';

// import {
//   queryProject,
//   createSnaphot,
//   createProject,
// } from '../projects';

// export const projectState = ({ socket, action }) => {
//   const { payload = {} } = action;
//   const { studyUID } = payload;

//   console.log('saving snapshot', studyUID);

//   createSnaphot({ studyUID, payload });
// }

// export const selectSeries = ({ socket, action }) => {
//   // const { studyUID, seriesUID } = action;
//   // // const { dicomImages = [] } = getState();
//   // const dicomImages = [];

//   // const volumePromise =
//   //   dicomVolume(dicomImages, studyUID, seriesUID);

//   // volumePromise.then(volume => {
//   //   console.log('Sending volume payload');
//   //   socket.emit('action', {
//   //     type: 'VOLUME_SET',
//   //     volume,
//   //   });
//   // });
// }

// export const selectStudy = ({ socket, action }) => {
//   const { studyUID } = action;

//   queryProject({ studyUID }).then(values => {
//     console.log('values1', values);

//     const project = values === undefined ?
//       createProject({ studyUID }) : values;

//     const dicomSeries = [];
//     console.log('dicomSeries', dicomSeries);

//     socket.emit('action', {
//       type: 'PROJECT_PAYLOAD',
//       project: {
//         ...project,
//         dicomSeries,
//       },
//     });
//   });
// }