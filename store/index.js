import {
  combineReducers,
  compose,
  createStore,
  applyMiddleware
} from "redux";
import { createLogger } from "redux-logger";
import createSocketIoMiddleware from "../middleware/createSocketIoMiddleware";
import io from "socket.io-client";
import thunk from "redux-thunk";
import persistSettings from "../middleware/persistSettings";
import userListAPI from "../middleware/userListAPI";
import * as reducers from "../reducers";
import route from "../middleware/route";

const socketIoMiddleware = createSocketIoMiddleware(
  "undefined" !== typeof window ? io() : io("http://localhost:3000"), // TODO This Still works but not clean
  "server/"
);

const enhancer = compose(
  "undefined" !== typeof window
    ? process.env.NODE_ENV !== "production"
      ? applyMiddleware(
          thunk,
          persistSettings,
          userListAPI,
          route,
          createLogger(),
          socketIoMiddleware
        )
      : applyMiddleware(
          thunk,
          persistSettings,
          userListAPI,
          route,
          socketIoMiddleware
        )
    : applyMiddleware(
        thunk,
        persistSettings,
        userListAPI,
        route,
        socketIoMiddleware
      )
);

export const initStore = (initialState = {}) => {
  return createStore(
    combineReducers(reducers),
    initialState,
    enhancer
  );
};
