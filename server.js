import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressSession from "express-session";
import http from "http";
import https from "https";
import fs from "fs";
import proxy from "http-proxy-middleware";
import auth from "./auth";
import api from "./api";
import routes from "./routes";
import socketApi from "./socketApi";
import authMiddleware from "./auth/middleware";

const flash = require("connect-flash");
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const sessionStoreLocal = () => {
  console.log("Using session-file-store");

  const FileStore = require("session-file-store")(expressSession);
  return new FileStore({ path: "./sessiondb" });
};

const sessionStoreAzure = () => {
  console.log("Using azure-session");
  return require("./auth/azure-session.js")(expressSession).create();
};

app.prepare().then(() => {
  const server = express();
  server.disable("x-powered-by"); //x-powered-by disable form headers
  const sessionMiddleWare = expressSession({
    store: process.env.LOCAL
      ? sessionStoreLocal() // Used for local testing
      : sessionStoreAzure(),
    secret: "session_secret",
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
  server.use(flash());

  const passport = auth(server);
  routes({ server, app }); // Setup routes

  // Setup static routes
  if (process.env.NODE_ENV !== "dev") {
    server.use("/static", authMiddleware({ redirect: false }));
    server.use("/static", express.static("static"));
  } else {
    // Used for local testing.
    server.use(
      "/static/interface",
      authMiddleware({ redirect: false }),
      (req, res) =>
        proxy({
          target: "http://localhost:8081",
          changeOrigin: true,
          pathRewrite: { "^/static/interface": "/" }
        })(req, res)
    );

    server.use(
      "/static/render",
      authMiddleware({ redirect: false }),
      (req, res) =>
        proxy({
          target: "http://localhost:8082",
          changeOrigin: true,
          pathRewrite: { "^/static/render": "/" }
        })(req, res)
    );
  }

  // All other pages handle with NextJS
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // TODO Use a single env var to declare if production or not? process.env.LOCAL?
  if (process.env.NODE_ENV !== "dev") {
    // Handle port 80 redirect if portal.multusmedical.com
    http
      .createServer((req, res) => {
        const { headers: { host = "portal.multusmedical.com" } = {} } = req;

        res.writeHead(301, { Location: `https://${host}` });
        res.end();
      })
      .listen(3001, () => {
        console.log(`Redirect HTTP server running`);
      });

    // If not dev we assume we are on Azure
    const options = {
      key: fs.readFileSync("certs/privkey1.pem"), // Uses Certbot mount archive
      cert: fs.readFileSync("certs/fullchain1.pem")
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
