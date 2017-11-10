import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { path, snapshotDir } from "./index";

export default async ({ studyUID }) => {
  if (path === undefined) return;
  if (!studyUID) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();

  const project = db
    .get("projects")
    .find({ studyUID: studyUID })
    .value();

  if (project !== undefined) {
    const { snapshots = [] } = project;
    snapshots.forEach(name => {
      try {
        fs.unlinkSync(`${snapshotDir}/${name}.json`);
        console.log("removed snapshot", name);
      } catch (e) {
        console.log("error", e);
      }
    });

    db
      .get("projects")
      .remove({ studyUID: studyUID })
      .write();
  }
};
