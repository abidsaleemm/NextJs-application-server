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
  io("http://localhost:3000"),
  "server/"
);

const enhancer = compose(
  // TODO Add wrapper for logging middleware to detect server
  process.env.NODE_ENV !== "production" && !process.env.LOCAL
    ? applyMiddleware(thunk, createLogger(), socketIoMiddleware)
    : // ? applyMiddleware(thunk)
      applyMiddleware(thunk, socketIoMiddleware)
);

export const initStore = (initialState = {}) => {
  return createStore(
    combineReducers(reducers),
    initialState, // TODO Should we use this?
    enhancer
  );
};
