import fs from "fs";

import getProject from "./getProject";
import getProjectSnapshot from "./getProjectSnapshot";
import getProjectList from "./getProjectList";
import setProjectSnapshot from "./setProjectSnapshot";
import setProject from "./setProject";
import destroyProject from "./destroyProject";


export default ({ path }) => {

  const snapshotDir = `${path}/snapshots`;

  if (fs.existsSync(snapshotDir) === false) {
    fs.mkdirSync(snapshotDir);
  }

  return {
    getProject: async props =>
      await getProject({ ...props, path, snapshotDir }),
    getProjectSnapshot: async props =>
      await getProjectSnapshot({ ...props, path, snapshotDir }),
    getProjectList: async props =>
      await getProjectList({ ...props, path, snapshotDir }),
    setProjectSnapshot: async props =>
      await setProjectSnapshot({ ...props, path, snapshotDir }),
    setProject: async props =>
      await setProject({ ...props, path, snapshotDir }),
    destroyProject: async props =>
      await destroyProject({ ...props, path, snapshotDir })
  };
};
