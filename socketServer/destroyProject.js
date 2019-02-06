import { route } from "../actions";
let debug = require('debug')('debug');

export default async ({ socket, action: { studyUID } = {}, adapter }) => {
  const {
    projects: {
      setProject = () => {},
      destroyProject = () => {}
    } = {}
  } = adapter;

  if (!studyUID) {
    return;
  }

  debug("Destroying project", studyUID);

  await destroyProject({ studyUID });
  await setProject({ studyUID, props: { status: "Start" } });

  socket.emit("action", route({ pathname: "/projects" }));
};
