import fs from "fs";
import low from "lowdb";
import uuid from "uuid";

export const path = "./projectsLocal";

// Add path if doesn't exist
const checkExists = () => {
  if (fs.existsSync(path) === false) {
    fs.mkdirSync(path);
  }

  const snapshotDir = `${path}/snapshots`;
  if (fs.existsSync(snapshotDir) === false) {
    fs.mkdirSync(snapshotDir);
  }
};

export const queryProjectList = async () => {
  checkExists();

  const projects = fs
    .readdirSync(path)
    .map(v => JSON.parse(fs.readFileSync(`${path}/${v}`)));

  // callback(null, projects)
};

export const queryProject = async ({ studyUID = '' }) => {
  checkExists();

  const db = low(`${path}/projects.json`);

  db.defaults({ projects: [] }).write();

  const project = db.get("projects").find({ studyUID: studyUID }).value();

  if (project !== undefined) {
    const { snapshot: snapShotUID } = project;

    const data = fs.readFileSync(`${path}/snapshots/${snapShotUID}.json`);
    return JSON.parse(data);
  } else {
    return undefined; // TODO If undefined create a new one and then try again
  }
};

export const createSnaphot = async ({ studyUID = "_", payload = {} }) => {
  checkExists(); // TODO Wrap this in high order function

  const snapShotUID = uuid();

  fs.writeFileSync(
    `${path}/snapshots/${snapShotUID}.json`,
    JSON.stringify(payload)
  );

  const db = low(`${path}/projects.json`);
  const ret = db.get("projects").find({ studyUID: studyUID }).value();

  if (ret === undefined) {
    // create
    db
      .get("projects")
      .push({ studyUID, snapshot: snapShotUID, snapshots: [snapShotUID] })
      .write();
  } else {
    // update
    const value = db
      .get("projects")
      .find({ studyUID })
      .assign({ snapshot: snapShotUID })
      .write()
      .value();

    console.log("value", value);
    // add snapshot
  }
};
