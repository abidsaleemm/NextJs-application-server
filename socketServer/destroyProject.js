import { destroyProject } from "../projects";
import { route } from "../actions";

export default async ({ socket, action: { studyUID } = {} }) => {
  if (!studyUID) {
    return;
  }

  console.log("Destroying project", studyUID);

  await destroyProject({ studyUID });
  socket.emit("action", route({ pathname: "/projects" }));
};
