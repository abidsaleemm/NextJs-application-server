import { route } from "../actions";
import { adapter } from "../server";

export default async ({ socket, action: { studyUID } = {} }) => {
  const { projects: { destroyProject = () => {} } = {} } = adapter;

  if (!studyUID) {
    return;
  }

  console.log("Destroying project", studyUID);

  await destroyProject({ studyUID });
  socket.emit("action", route({ pathname: "/projects" }));
};
