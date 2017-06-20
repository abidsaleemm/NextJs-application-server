import express from "express";
import next from 'next';
import * as socketActions from "./socketActions";
import auth from './auth';

import { queryStudies } from './dicom';

const port = process.env.PORT || 8080;

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  console.log('Login Failure');
  // res.redirect('/login');
};

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express()

    // if (process.env.NODE_ENV !== 'dev') {
    // }
    // auth(server); // TODO handle as a promise

    // server.get('/m', (req, res) => {
      // return app.render(req, res, '/management', req.query)
    // })

    server.get('/projectDetail', (req, res) => {
      return app.render(req, res, '/projectDetail', req.query)
    })

    // server.get('*', ensureAuthenticated, (req, res) => {
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const serverHttp = server.listen(port, () => {
      console.log(`listening on *:${port}`);

      // Start SocketIO handler
      const io = socketSetup(serverHttp);
    });

    // server.listen(3000, (err) => {
    // if (err) throw err
    // console.log('> Ready on http://localhost:3000')
    // })
  })

// TODO Move this to seperate file and cut up?
const socketSetup = server => {
  const io = require("socket.io").listen(server);

  // Handle socket connections
  io.on("connection", socket => {
    console.log("Connection " + socket.id);

    // This is used for the frontend of the application
    socket.on("action", ({ type, ...action }) => {
      const parseType = type.replace(/^(server\/)/, ""); // TODO Do we really need this. Can just leave in and rename functions?
      console.log("action.type", parseType);

      // TODO check security token here
      const { [parseType]: socketAction = () => { } } = socketActions;
      socketAction({ socket, action });
    });

    // TODO cut up into individual files
    socket.on('queryStudies', () => {
      queryStudies().then(studies => {
        socket.emit('queryStudies', studies);
        // console.log('socket.io studies', studies);
      });
    });

    socket.on("disconnect", error => {
      console.log("Disconnect " + socket.id, error);
    });
  });

  return io;
};
