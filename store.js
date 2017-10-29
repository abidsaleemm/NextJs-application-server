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
  // io("http://localhost:3000"),
  // io(),
  "undefined" !== typeof window ? io() : io("http://localhost:3000"),
  "server/"
);

const enhancer = compose(
  applyMiddleware(thunk, socketIoMiddleware)
  // applyMiddleware(thunk, createLogger(), socketIoMiddleware)
);

export const initStore = (initialState = {}) => {
  return createStore(
    combineReducers(reducers),
    initialState, // TODO Should we use this?
    enhancer
  );
};
