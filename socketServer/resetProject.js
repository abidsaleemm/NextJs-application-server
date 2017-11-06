import createProject from "../projects/createProject";
import {
  // setProject,
  setProjectSnapshot
} from "../projects";
import { route, fetchAction } from "../actions";

export default async ({ socket, action: { studyUID } = {} }) => {
  if (!studyUID) {
    return;
  }

  console.log("Resetting project to default", studyUID);

  await socket.emit("action", fetchAction(true));

  const project = createProject({ studyUID }); // TODO Add function to create default from existing
  await setProjectSnapshot({
    studyUID,
    payload: project,
    injuryImpingement: {
      visible: false,
      labelVisible: true,
      opacity: 1,
      discs: {}
    }
  });

  await socket.emit(
    "action",
    route({ pathname: "/projectDetail", query: { studyUID } })
  );

  socket.emit("action", fetchAction(false));
};
