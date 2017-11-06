import { deleteProject } from "../projects";
import { route, fetchAction } from "../actions";

export default async ({ socket, action: { studyUID } = {} }) => {
  if (!studyUID) {
    return;
  }

  await socket.emit("action", fetchAction(true));
  await deleteProject({ studyUID });
  await socket.emit("action", route({ pathname: "/projects" }));

  // TODO check if the project already exists if so just load
  // console.log("Creating new project", studyUID);

  // await socket.emit("action", fetchAction(true));

  // const project = createProject({ studyUID }); // TODO Add function to create default from existing
  // await setProject({ studyUID, props: { status: 1 } });
  // await setProjectSnapshot({ studyUID, payload: project });

  // await socket.emit(
  //   "action",
  //   route({ pathname: "/projectDetail", query: { studyUID } })
  // );

  // socket.emit("action", fetchAction(false));
};
