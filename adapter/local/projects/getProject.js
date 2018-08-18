import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import hasProjectSnapshots from "./hasProjectSnapshots";

export default async ({ studyUID = "", path }) => {
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();

  const project = db
    .get("projects")
    .find({ studyUID: studyUID })
    .value();

  if (project !== undefined) {
    const { status = 0, defaultStudyUID, multusID, notes = "", encoding, deleted, sample, userID } = project;

    return {
      studyUID,
      status,
      defaultStudyUID,
      multusID,
      encoding,
      deleted,
      sample,
      userID,
      notes,
      hasProjectSnapshots: await hasProjectSnapshots({ studyUID, path })
    };
  }
};
