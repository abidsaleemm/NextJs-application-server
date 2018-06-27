import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// TODO Add functionality to index prev snapshots?
export default async ({ studyUID = "", path }) => {
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));

  db.defaults({ projects: [] }).write();

  const project = db
    .get("projects")
    .find({ studyUID: studyUID })
    .value();

  if (project !== undefined) {
    const { snapshot: snapShotUID } = project;
    if (snapShotUID === undefined) return; // No Snapshot.  First value?

    try {
      const data = fs.readFileSync(
        `${path}/snapshots/${snapShotUID}.json`
      );
      return JSON.parse(data);
    } catch (e) {
      return;
    }
  } else {
    return;
  }
};
