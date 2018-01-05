import { getProject } from "../projects";
import { getDefault } from "../defaults";
import createProject from '../projects/createProject';

export default async ({ socket, action }) => {
  const { props = {}, func, studyUID } = action;

  // TODO Get default for studyUID
  const project = await getProject({ studyUID });
  if (project) {
    const { defaultName } = project;
    // const defaultState = await getDefault({ name: defaultName });
    // TODO If no default build props from base models
    // defaultName

    const defaultState = createProject({ studyUID });

    if (defaultState) {
      const actualFunction = new Function(
        `return (${func.toString()})`
      )();
      actualFunction(socket, defaultState, props);
    }
  }
};
