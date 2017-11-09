import { setProjectSnapshot, getProject } from "../projects";
import { fetchAction } from "../actions";
import { getDefault } from "../defaults";
import selectStudy from "../socketEditor/selectStudy";

export default async ({ socket, io, action: { studyUID } = {} }) => {
  if (!studyUID) {
    // TODO Add better error handling here
    return;
  }

  const project = await getProject({ studyUID });
  const { defaultName } = project;

  console.log("defaultName", defaultName);

  const projectDefault = await getDefault({ name: defaultName });

  if (!projectDefault) {
    // TODO Handle Error can't find default name
    console.log("Cant find project default");
    socket.emit("action", fetchAction(false));
    return;
  }

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
    clientSocket.emit("action", {
      type: "SPINNER_TOGGLE",
      toggle: true
    });
    await selectStudy({ socket: clientSocket, action: { studyUID } });
  }));

  await socket.emit("action", fetchAction(false)
);
};
