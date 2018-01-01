import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// TODO Should be some sort of global import
const rootPath = "projectsLocal";

const dbPath = `${rootPath}/metaData.json`;

// TODO this should be some sort of reusable function under helpers
// Add path if doesn't exist.  Make this more upper scope
const checkExists = () => {
  if (fs.existsSync(rootPath) === false) {
    fs.mkdirSync(rootPath);
  }
};

checkExists();
const db = low(new FileSync(dbPath));
db.defaults({ data: [] }).write();

export const setMetaData = async ({ studyUID, props = {} }) => {
  if (studyUID) {
    const find = db.get("data").find({ studyUID }).value();
    if (find) {
      db
        .get("data")
        .find({ studyUID })
        .assign(props)
        .write();
    } else {
      db
        .get("data")
        .push({ studyUID, ...props })
        .write();
    }
  }
};

export const getMetaData = async ({ studyUID }) => {
  // Add a post
  const value = db
    .get("data")
    .find({ studyUID })
    .value();

  return value || {};
};
