import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSocketIoMiddleware from "../middleware/createSocketIoMiddleware";
import io from "socket.io-client";
import thunk from "redux-thunk";
import persistSettings from "../middleware/persistSettings";
import userListAPI from "../middleware/userListAPI";
import middlewareSettings from "../middleware/middlewareSettings";
import * as reducers from "../reducers";
import route from "../middleware/route";

const options = {
  pingTimeout: 60000,
  // pingInterval: 	25000,
//   upgradeTimeout: 30000,
  transports: ["websocket"],
  allowUpgrades: false,
};

const socketIoMiddleware = createSocketIoMiddleware(
  "undefined" !== typeof window
    ? io(options)
    : io("http://localhost:3000", options), // TODO This Still works but not clean
  "server/"
);

const enhancer = compose(
  "undefined" !== typeof window
    ? process.env.NODE_ENV !== "production"
      ? applyMiddleware(
          thunk,
          middlewareSettings(),
          persistSettings,
          userListAPI,
          route,
          createLogger(),
          socketIoMiddleware
        )
      : applyMiddleware(
          thunk,
          middlewareSettings(),
          persistSettings,
          userListAPI,
          route,
          socketIoMiddleware
        )
    : applyMiddleware(
        thunk,
        middlewareSettings(),
        persistSettings,
        userListAPI,
        route,
        socketIoMiddleware
      )
);

export const initStore = (initialState = {}) => {
  return createStore(combineReducers(reducers), initialState, enhancer);
};
