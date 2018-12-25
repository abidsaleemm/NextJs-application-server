import { SET_RENDER } from "../constants/actionTypes";

export default async ({
  socket,
  action: { type, studyUID, template, anonymous, debug, ...props } = {},
  adapter
}) => {
  const { renders: { setRenderQueue = () => {} } = {} } = adapter;

  await setRenderQueue({
    ...props,
    studyUID,
    template,
    debug,
    anonymous
  });

  // Pass same action to other connected clients
//   socket.broadcast.emit("action", {
//     type: SET_RENDER,
//     ...props,
//     studyUID,
//     template,
//     debug,
//     anonymous
//   });
};
