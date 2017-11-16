import fs from "fs";

import getProject from "./getProject";
import getProjectSnapshot from "./getProjectSnapshot";
import getProjectList from "./getProjectList";
import setProjectSnapshot from "./setProjectSnapshot";
import setProject from "./setProject";
import destroyProject from "./destroyProject";

// TODO Root path should be global and imported for all local adapters
export const path = "./projectsLocal";
export const snapshotDir = `${path}/snapshots`;

// TODO this should be some sort of reusable function under helpers
// Add path if doesn't exist
export const checkExists = () => {
  if (fs.existsSync(path) === false) {
    fs.mkdirSync(path);
  }

  if (fs.existsSync(snapshotDir) === false) {
    fs.mkdirSync(snapshotDir);
  }
};

module.exports = {
  getProject: async props => {
    checkExists();
    return await getProject(props);
  },
  getProjectSnapshot: async props => {
    checkExists();
    return await getProjectSnapshot(props);
  },
  getProjectList: async props => {
    checkExists();
    return await getProjectList(props);
  },
  setProjectSnapshot: async props => {
    checkExists();
    return await setProjectSnapshot(props);
  },
  setProject: async props => {
    checkExists();
    return await setProject(props);
  },
  destroyProject: async props => {
    checkExists();
    return await destroyProject(props);
  }
};
