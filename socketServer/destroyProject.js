import { destroyProject } from "../projects";
import { route, fetchAction } from "../actions";

export default async ({ socket, action: { studyUID } = {} }) => {
  if (!studyUID) {
    return;
  }

  console.log("Destroying project", studyUID);

  await destroyProject({ studyUID });
  await socket.emit("action", route({ pathname: "/projects" }));
};
