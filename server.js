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
import routes from "./routes";
import socketManager from "./socketManager";
import authMiddleware from "./auth/middleware";
import storageAdapter from "adapters";

// TODO This is a hack.  Instead pass this prop through. WG
export let adapter;

export default async () => {
  adapter = await storageAdapter({
    adapter: process.env.LOCAL ? "local" : "azure",
    ...(process.env.PROJECTS_PATH
      ? { projectsPath: process.env.PROJECTS_PATH }
      : {}),
    ...(process.env.RENDER ? { cacheDisabled: true } : {}),
    ...(process.env.LOCAL ? { path: "../projectsLocal" } : {}),
    ...(!process.env.LOCAL
      ? {
          storageAccount: process.env.STORAGE_ACCOUNT,
          storageKey: process.env.STORAGE_ACCOUNT_KEY
        }
      : {})
  });

  const flash = require("connect-flash");
  const port = process.env.PORT || 3000;
  const dev = process.env.NODE_ENV !== "production";

  const app = next({ dev });
  const handle = app.getRequestHandler();

  // TODO Use a better adapter style?
  const sessionStoreLocal = () => {
    console.log("Using session-file-store");

    const FileStore = require("session-file-store")(expressSession);
    return new FileStore({ path: "./sessiondb" });
  };

  // TODO Use a better adapter style?
  const sessionStoreAzure = () => {
    console.log("Using azure-session");
    return require("./auth/azure-session.js")(expressSession).create();
  };

  // TODO Add await here? WG
  app.prepare().then(() => {
    const server = express();
    server.disable("x-powered-by"); //x-powered-by disable form headers
    const sessionMiddleWare = expressSession({
      store: process.env.LOCAL
        ? // TODO Use a better adapter style?
          sessionStoreLocal() // Used for local testing
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
    if (!dev) {
      server.use(
        "/static/interface",
        authMiddleware({ redirect: false }),
        express.static("static/interface")
      );
      server.use(
        "/static/render",
        authMiddleware({ redirect: false }),
        express.static("static/render")
      );

      server.use("/static/public", express.static("static/public"));
    } else {
      // Used for local testing.
      server.use(
        "/static/interface", // TODO Change name from interface to editor
        authMiddleware({ redirect: false }),
        (req, res) =>
          proxy({
            target: "http://localhost:8081",
            changeOrigin: true,
            pathRewrite: { "^/static/interface": "/" } // TODO Change name from interface to editor
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

    //
    if (!process.env.LOCAL && !dev) {
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
        key: fs.readFileSync("certs/privkey.pem"), // TODO see issue-89. Uses Certbot mount archive
        cert: fs.readFileSync("certs/fullchain.pem")
      };

      const serverHttp = https
        .createServer(options, server)
        .listen(port, () => {
          console.log(`SSL listening on *:${port}`);
          const io = socketManager({
            server: serverHttp,
            passport,
            sessionMiddleWare
          });
        });
    } else {
      // Used for local development
      const serverHttp = server.listen(port, () => {
        console.log(`Listening on *:${port}`);
        const io = socketManager({
          server: serverHttp,
          passport,
          sessionMiddleWare
        });
      });
    }
  });
};
