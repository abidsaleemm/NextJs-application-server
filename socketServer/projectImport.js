import { fetchAction } from "../actions";
import { selectStudy } from "../socketEditor";
// Add props that need to be remove
const filterRemove = ["studyUID"];

export default async ({
    socket,
    io,
    action: { studyUID = "", data = "" } = {},
    adapter
}) => {
    const {
        projects: { setProjectPayload = () => { } } = {}
    } = adapter;

    socket.emit("action", fetchAction(true));

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

    const clientSockets = Object.values(io.sockets.sockets).filter(
        ({ rooms = {} }) => Object.keys(rooms).some(v => v === roomName)
    );

    await setProjectPayload({
        studyUID,
        payload: {
            ...payload,
            studyUID
        }
    });

    await Promise.all(
        clientSockets.map(async clientSocket => {
            clientSocket.emit("action", {
                type: "SPINNER_TOGGLE",
                toggle: true
            });
            await selectStudy({
                socket: clientSocket,
                action: { studyUID }
            });
        })
    );

    socket.emit("action", fetchAction(false));
};
