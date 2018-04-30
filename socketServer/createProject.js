import createProject from "../projects/createProject";
import {
  setProject,
  setProjectSnapshot,
  getProjectSnapshot
} from "../projects";
import { route, fetchAction } from "../actions";
import { getDefault } from "../defaults";

export default async ({
  socket,
  action: { studyUID, defaultStudyUID = "" } = {}
}) => {
  if (!studyUID) {
    return;
  }

  // TODO check if the project already exists if so just load
  console.log("Creating new project", studyUID, defaultStudyUID);

  await socket.emit("action", fetchAction(true));

  // TODO Add better error handling
  const project =
    defaultStudyUID !== ""
      ? await getProjectSnapshot({ studyUID: defaultStudyUID })
      : createProject({ studyUID });

  await setProject({
    studyUID,
    props: { defaultStudyUID, status: 1 }
  });
  await setProjectSnapshot({ studyUID, payload: project });

  await socket.emit(
    "action",
    route({ pathname: "/projectDetail", query: { studyUID } })
  );

  socket.emit("action", fetchAction(false));
};
