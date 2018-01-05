import { setProjectSnapshot, getProject } from "../projects";
import createProject from '../projects/createProject';
import { route, fetchAction } from "../actions";
import { getDefault } from "../defaults";
import selectStudy from "../socketEditor/selectStudy";

export default async ({ socket, io, action: { studyUID } = {} }) => {
  if (!studyUID) {
    // TODO Add better error handling here
    return;
  }

  // Lookup Project
  const project = await getProject({ studyUID });
  const { defaultName = '' } = project;

  const projectDefault =
    defaultName !== ""
      ? await getDefault({ name: defaultName })
      : createProject({ studyUID });

  console.log("Resetting project to default", studyUID);

  await setProjectSnapshot({
    studyUID,
    payload: {
      ...projectDefault,
      studyUID
    }
  });

  // TODO This is reusable clean up at some point
  const roomName = `editor/${studyUID}`; // TODO This is reused someplace else.
  const clientSockets = Object.values(
    io.sockets.sockets
  ).filter(({ rooms = {} }) =>
    Object.keys(rooms).some(v => v === roomName)
  );

  
  await Promise.all(clientSockets.map(async clientSocket => {
    // await socket.emit("action", route({ pathname: "/projects" }));
    clientSocket.emit("action", {
      type: "SPINNER_TOGGLE",
      toggle: true
    });
    await selectStudy({ socket: clientSocket, action: { studyUID } });
  }));

  await socket.emit("action", fetchAction(false));
};
