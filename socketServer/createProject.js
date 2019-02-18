import createProject from "../helpers/createProject";
import { route, fetchAction } from "../actions";
let debug = require('debug')('debug');
const defaultStatus = "Segmentation";

export default async ({
    socket,
    action: { studyUID, defaultStudyUID = "" } = {},
    adapter
}) => {
    const {
        projects: {
            setProject = () => { },
            setProjectPayload = () => { },
            getProjectPayload = () => { }
        } = {}
    } = adapter;

    if (!studyUID) {
        return;
    }

    // TODO check if the project already exists if so just load
    debug("Creating new project", studyUID, defaultStudyUID);

    await socket.emit("action", fetchAction(true));

    // TODO Add better error handling
    const project =
        defaultStudyUID !== ""
            ? await getProjectPayload({ studyUID: defaultStudyUID })
            : createProject({ studyUID });

    await setProject({
        studyUID,
        props: { defaultStudyUID, status: defaultStatus }
    });
    await setProjectPayload({ studyUID, payload: project });

    await socket.emit(
        "action",
        route({ pathname: "/projectDetail", query: { studyUID } })
    );

    socket.emit("action", fetchAction(false));
};
