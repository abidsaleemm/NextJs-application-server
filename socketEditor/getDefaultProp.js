import { getProject, getProjectSnapshot } from "../projects";
import createProject from "../projects/createProject";

export default async ({ socket, action }) => {
  const { props = {}, func, studyUID } = action;

  // TODO Get default for studyUID
  const project = await getProject({ studyUID });
  if (project) {
    const { defaultStudyUID = "" } = project;

    const projectSnapShot = await getProjectSnapshot({
      studyUID: defaultStudyUID
    });

    const defaultState = projectSnapShot
      ? projectSnapShot
      : createProject({ studyUID });

    if (defaultState) {
      const actualFunction = new Function(
        `return (${func.toString()})`
      )();

      actualFunction(socket, defaultState, props);
    }
  }
};
