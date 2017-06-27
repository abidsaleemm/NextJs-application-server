export { default as createSnapshot } from './createSnapshot';
export { default as queryProject } from './queryProject';
export { default as queryProjectList } from './queryProjectList';
export { default as setProjectClient } from './setProjectClient';
export { default as setProjectStatus } from './setProjectStatus';

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