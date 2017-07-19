import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressSession from "express-session";
import https from 'https';

import auth from "./auth";
import api from './api';
import routes from './routes';
import socketApi from './socketApi';
const AzureTablesStoreFactory = require('./auth/azure-session.js')(expressSession);

//const FileStore = require("session-file-store")(expressSession); // TODO Use import instead
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// TODO Is there a better place for this?
// const sessionStore = new FileStore({ path: "./sessiondb" });
// const sessionMiddleWare = expressSession({
//   key: "express.sid",
//   secret: "session_secret",
//   resave: true,
//   saveUninitialized: false,
//   store: sessionStore,
// });

app.prepare().then(() => {
  const server = express();

  var options = { logger: console.log, errorLogger: console.log, sessionTimeOut: 86400000, overrideCron: '0 0 */1 * * *' };
  // if dont have azure storage keys in .env file then we have to supply in option parameters (storageAccount,accessKey)
  const sessionMiddleWare = expressSession({
    store: AzureTablesStoreFactory.create(options),
    secret: 'session_secret',
    key: "express.sid",
    resave: true,
    rolling: true,
    cookie: { maxAge: 86400000 },
    saveUninitialized: false
  });




  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(sessionMiddleWare);

  const passport = auth(server);
  routes({ server, app }); // Setup routes

  server.get("*", (req, res) => {
    return handle(req, res);
  });

 if (process.env.NODE_ENV !== 'dev') {
    // If none dev we assume we are on Azure
    const options = {
      key: fs.readFileSync('certs/privkey1.pem'), // Uses Certbot mount archive so thats why there is a number
      cert: fs.readFileSync('certs/fullchain1.pem')
    };

    const serverHttp = https.createServer(options, server).listen(port, () => {
      console.log(`SSL listening on *:${port}`);
      const io = socketApi({ server: serverHttp, passport, sessionMiddleWare });
    });
  } else {
    // Used for local development
    const serverHttp = server.listen(port, () => {
      console.log(`Listening on *:${port}`);
      const io = socketApi({ server: serverHttp, passport, sessionMiddleWare });
    });
  }
});

