import { createContainerIfNotExists } from "../blob";
import { createTableIfNotExists } from "./table";

import getProject from "./getProject";
import getProjectList from "./getProjectList";
import getProjectSnapshot from "./getProjectSnapshot";
import setProject from "./setProject";
import setProjectSnapshot from "./setProjectSnapshot";
import destroyProject from "./destroyProject";

export default async azureProps => {
  await createTableIfNotExists(props);
  await createContainerIfNotExists(props);

  return {
    getProject: async props =>
      await getProject({ ...azureProps, ...props }),
    getProjectList: async props =>
      await getProjectList({ ...azureProps, ...props }),
    getProjectSnapshot: async props =>
      await getProjectSnapshot({ ...azureProps, ...props }),
    setProject: async props =>
      await setProject({ ...azureProps, ...props }),
    setProjectSnapshot: async props =>
      await setProjectSnapshot({ ...azureProps, ...props }),
    destroyProject: async props =>
      await destroyProject({ ...azureProps, ...props })
  };
};
