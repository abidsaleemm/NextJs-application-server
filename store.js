import {
  combineReducers,
  compose,
  createStore,
  applyMiddleware
} from "redux";
import { createLogger } from "redux-logger";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import thunk from "redux-thunk";
import * as reducers from "./reducers";

const socketIoMiddleware = createSocketIoMiddleware(
  "undefined" !== typeof window ? io() : io("http://localhost:3000"), // TODO This Still works but not clean
  "server/"
);

const enhancer = compose(
  "undefined" !== typeof window
    ? process.env.NODE_ENV !== "production"
      ? applyMiddleware(thunk, createLogger(), socketIoMiddleware)
      : applyMiddleware(thunk, socketIoMiddleware)
    : applyMiddleware(thunk, socketIoMiddleware)
);

export const initStore = (initialState = {}) => {
  return createStore(
    combineReducers(reducers),
    initialState,
    enhancer
  );
};
