import io from "socket.io-client";

export default async (action = "", props = {}) => {
  const socket = io();
  return await new Promise((resolve, reject) => {
    socket.emit(action, props, retProps => {
      // TODO Socketio should always return a response as object, but might change in the future when API gets refactored
      resolve(retProps);
    });
  });
};
