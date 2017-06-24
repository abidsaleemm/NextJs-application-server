import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressSession from "express-session";
import https from 'https';

// import passportSocketIo from "passport.socketio";

import * as socketActions from "./socketActions";
import auth from "./auth";

// Data methods
import {
  queryStudies,
  queryStudyByUID,
} from './dicom';

import { queryProject, createSnaphot, createProject } from './projects';

const FileStore = require("session-file-store")(expressSession); // TODO Use import instead
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// TODO Is there a better place for this?
const sessionStore = new FileStore({ path: "./sessiondb" });

const sessionMiddleWare = expressSession({
  key: "express.sid",
  secret: "session_secret",
  resave: true,
  saveUninitialized: false,
  store: sessionStore,
});


app.prepare().then(() => {
  const server = express();

  // Setup Middleware
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(sessionMiddleWare);

  const passport = auth(server); // TODO handle as a promise

  // projects handler
  server.get("/projects", async (req, res) => {
    if (req.isAuthenticated()) {
      const projects = await queryStudies();
      return app.render(req, res, "/projects", { ...req.query, projects });
    }

    return res.redirect('/');
  });

  // projectDetail handler
  server.get("/projectDetail/:projectid", async (req, res) => {
    const { projectid: studyUID = '' } = req.params;
    console.log('studyUID', studyUID)
    const study = await queryStudyByUID({ studyUID });
    let project = await queryProject({ studyUID });

    if (project === undefined) {
      console.log('Creating new project');
      project = createProject({ studyUID }); // TODO Add function to create default from existing
    }

    // Merge project and study table
    project = { ...project, ...study };

    if (req.isAuthenticated()) {
      const projectDetails = {};

      return app.render(req, res, "/projectDetail", {
        ...req.query,
        projectDetail: project,
      });
    }

    res.redirect('/');
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  if (process.env.NODE_ENV !== 'dev') {
    const options = {
      key: fs.readFileSync('certs/privkey1.pem'),
      cert: fs.readFileSync('certs/fullchain1.pem')
    };

    const serverHttp = https.createServer(options, server).listen(port, () => {
      console.log(`SSL listening on *:${port}`);
      const io = socketSetup(serverHttp, passport);
    });
  } else {
    const serverHttp = server.listen(port, () => {
      console.log(`Listening on *:${port}`);
      const io = socketSetup(serverHttp, passport);
    });
  }
});

// TODO Move this to seperate file and cut up?
const socketSetup = (server, passport) => {
  const io = require("socket.io").listen(server);

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
