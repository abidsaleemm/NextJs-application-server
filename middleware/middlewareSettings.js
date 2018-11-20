import { propSatisfies } from "ramda";
import { PROJECTS_SET_SETTINGS } from "../constants/actionTypes";

export default () => {
  return store => next => action => {
    const { type, settings: { filter = {} } = {} } = action;

    const result = next(action);
    if (type === PROJECTS_SET_SETTINGS) {
      if (
        propSatisfies(status => status !== undefined, "status", filter) ||
        propSatisfies(
          projectType => projectType !== undefined,
          "projectType",
          filter
        )
      ) {
        const { projectsSettings } = store.getState();
        store.dispatch({ type: "server/updateProjectsList", projectsSettings });
      }
    }

    return result;
  };
};
