import fs from "fs";

import getProject from "./getProject";
import getProjectSnapshot from "./getProjectSnapshot";
import getProjectList from "./getProjectList";
import setProjectSnapshot from "./setProjectSnapshot";
import setProject from "./setProject";
import destroyProject from "./destroyProject";

// TODO Root path should be global and imported for all local adapters
// TODO Pass thesethrough as props
// export const path = "./projectsLocal";
// const snapshotDir = `${path}/snapshots`;

// TODO this should be some sort of reusable function under helpers
// Add path if doesn't exist
// Reusabe
// const checkExists = () => {
//   if (fs.existsSync(path) === false) {
//     fs.mkdirSync(path);
//   }

//   if (fs.existsSync(snapshotDir) === false) {
//     fs.mkdirSync(snapshotDir);
//   }
// };

// module.exports = {
//   getProject: async props => {
//     checkExists();
//     return await getProject(props);
//   },
//   getProjectSnapshot: async props => {
//     checkExists();
//     return await getProjectSnapshot(props);
//   },
//   getProjectList: async props => {
//     checkExists();
//     return await getProjectList(props);
//   },
//   setProjectSnapshot: async props => {
//     checkExists();
//     return await setProjectSnapshot(props);
//   },
//   setProject: async props => {
//     checkExists();
//     return await setProject(props);
//   },
//   destroyProject: async props => {
//     checkExists();
//     return await destroyProject(props);
//   }
// };

export default async ({ path }) => {
  //   checkExists();

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
