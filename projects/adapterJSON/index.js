export { default as getProject } from './getProject';
export { default as getProjectSnapshot } from './getProjectSnapshot';
export { default as getProjectList } from './getProjectList';
export { default as setProjectSnapshot } from './setProjectSnapshot';
export { default as setProject } from './setProject';

export const path = "./projectsLocal";

// Add path if doesn't exist
export const checkExists = () => {
  if (fs.existsSync(path) === false) {
    fs.mkdirSync(path);
  }

  const snapshotDir = `${path}/snapshots`;
  if (fs.existsSync(snapshotDir) === false) {
    fs.mkdirSync(snapshotDir);
  }
};