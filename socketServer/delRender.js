import { DEL_RENDER } from "../constants/actionTypes";

import { adapter } from "../server";

export default async ({
  socket,
  action: { studyUID, template, anonymous, debug } = {}
}) => {
  const { renders: { delRenderQueue = () => {} } = {} } = adapter;

  await delRenderQueue({
    studyUID,
    template,
    debug,
    anonymous
  });

  // Pass same action to other connected clients
  socket.broadcast.emit("action", {
    type: DEL_RENDER,
    studyUID,
    template,
    debug,
    anonymous
  });
};
