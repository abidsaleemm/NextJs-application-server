import createProject from "../helpers/createProject";
import { fetchAction } from "../actions";
import selectStudy from "../socketEditor/selectStudy";
let debug = require('debug')('debug');

export default async ({ socket, io, action: { studyUID } = {}, adapter }) => {
    const {
        projects: {
            getProject = () => { },
            setProjectPayload = () => { },
            getProjectPayload = () => { }
        } = {}
    } = adapter;

    if (!studyUID) {
        // TODO Add better error handling here
        return;
    }

    socket.emit("action", fetchAction(true));

    // Lookup Project
    // TODO Optimize loading
    const project = await getProject({ studyUID });
    const { defaultStudyUID = "" } = project;

    const projectSnapShot = await getProjectPayload({
        studyUID: defaultStudyUID
    });

    const projectDefault = projectSnapShot
        ? projectSnapShot
        : createProject({ studyUID });

    debug("Resetting project to default", studyUID);

    await setProjectPayload({
        studyUID,
        payload: {
            ...projectDefault,
            studyUID
        }
    });

    // TODO This is reusable clean up at some point
    const roomName = `editor/${studyUID}`; // TODO This is reused someplace else.
    const clientSockets = Object.values(io.sockets.sockets).filter(
        ({ rooms = {} }) => Object.keys(rooms).some(v => v === roomName)
    );

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
