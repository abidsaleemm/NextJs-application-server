import createProject from "../helpers/createProject";
import { adapter } from "../server";

export default async ({ socket, action }) => {
  const {
    projects: {
      getProject = () => {},
      getProjectSnapshot = () => {}
    } = {}
  } = adapter;

  const { props = {}, func, studyUID } = action;

  // TODO Get default for studyUID
  const project = await getProject({ studyUID });
  if (project) {
    const { defaultStudyUID = "" } = project;

    const defaultState =
      defaultStudyUID !== ""
        ? await getProjectSnapshot({
            studyUID: defaultStudyUID
          })
        : createProject({ studyUID });

    if (defaultState) {
      const actualFunction = new Function(
        `return (${func.toString()})`
      )();

      actualFunction(socket, defaultState, props);
    }
  }
};
