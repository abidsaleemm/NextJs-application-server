import createProject from "../projects/createProject";
import { setProject, setProjectSnapshot } from "../projects";
import { route, fetchAction } from "../actions";
import { getDefault } from "../defaults";

export default async ({
  socket,
  action: { studyUID, defaultName } = {}
}) => {
  if (!studyUID) {
    return;
  }
  // TODO check if the project already exists if so just load
  console.log("Creating new project", studyUID, defaultName);

  await socket.emit("action", fetchAction(true));

  const project = defaultName
    ? await getDefault({ name: defaultName })
    : createProject({ studyUID });

  await setProject({ studyUID, props: { defaultName, status: 1 } });
  await setProjectSnapshot({ studyUID, payload: project });

  await socket.emit(
    "action",
    route({ pathname: "/projectDetail", query: { studyUID } })
  );

  socket.emit("action", fetchAction(false));
};
