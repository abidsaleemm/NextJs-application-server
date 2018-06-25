import getProject from "./getProject";
import getProjectList from "./getProjectList";
import getProjectSnapshot from "./getProjectSnapshot";
import setProject from "./setProject";
import setProjectSnapshot from "./setProjectSnapshot";
import destroyProject from "./destroyProject";

export default azureProps => {
  const {
    blobAdapter: { createContainerIfNotExists },
    tableAdapter: { createTableIfNotExists },
    tableName
  } = azureProps;

  const containerName = tableName;

  createTableIfNotExists({ tableName });
  createContainerIfNotExists({ containerName: tableName });

  return {
    getProject: async props =>
      await getProject({ ...azureProps, ...props, containerName }),
    getProjectList: async props =>
      await getProjectList({
        ...azureProps,
        ...props,
        containerName
      }),
    getProjectSnapshot: async props =>
      await getProjectSnapshot({
        ...azureProps,
        ...props,
        containerName
      }),
    setProject: async props =>
      await setProject({ ...azureProps, ...props }),
    setProjectSnapshot: async props =>
      await setProjectSnapshot({ ...azureProps, ...props }),
    destroyProject: async props =>
      await destroyProject({ ...azureProps, ...props })
  };
};
