import { route } from "../actions";
import { adapter } from "../server";

export default async ({ socket, action: { studyUID } = {} }) => {
  const {
    projects: {
      setProject = () => {},
      destroyProject = () => {}
    } = {}
  } = adapter;

  if (!studyUID) {
    return;
  }

  console.log("Destroying project", studyUID);

  await destroyProject({ studyUID });
  await setProject({ studyUID, props: { status: "None" } });

  socket.emit("action", route({ pathname: "/projects" }));
};
