import { fetchAction } from "../actions";
import { setProjectSnapshot, getProjectSnapshot } from "../projects";
import { selectStudy } from "../socketEditor";

// Add props that need to be remove
const filterRemove = ["studyUID"];

export default async ({
  socket,
  io,
  action: { studyUID = "", data = "" } = {}
}) => {
  const parsedData = JSON.parse(data); // TODO Add better error handling around JSON parsing
  const roomName = `editor/${studyUID}`; // TODO This is reused someplace else.

  // Remap and remove props here.  Maybe use ramda instead?
  const payload = Object.entries(parsedData).reduce(
    (a, [k, v]) => ({
      ...a,
      ...(filterRemove.some(v => v === k) ? {} : { [k]: v })
    }),
    {}
  );

  const clientSockets = Object.values(
    io.sockets.sockets
  ).filter(({ rooms = {} }) =>
    Object.keys(rooms).some(v => v === roomName)
  );

  await setProjectSnapshot({
    studyUID,
    payload
  });

  socket.emit("action", fetchAction(false));

  clientSockets.forEach(async clientSocket => {
    const { rooms, id } = clientSocket;
    clientSocket.emit("action", {
      type: "SPINNER_TOGGLE",
      toggle: true
    });
    await selectStudy({ socket: clientSocket, action: { studyUID } });
  });
};
