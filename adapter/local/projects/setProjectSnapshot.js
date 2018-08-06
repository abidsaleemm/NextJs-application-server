import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import uuid from "uuid";

export default async ({ studyUID = "_", payload = {}, path }) => {
  if (path === undefined) return;

  // TODO Reuseable?
  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();
  const ret = db
    .get("projects")
    .find({ studyUID: studyUID })
    .value();

  // If project doesn't exist bailout
  if (ret === undefined) {
    return;
  }

  const snapShotUID = uuid();

  // TODO use file adapter
  fs.writeFileSync(
    `${path}/snapshots/${snapShotUID}.json`,
    JSON.stringify(payload)
  );

  db.get("projects")
    .find({ studyUID })
    .assign({ snapshot: snapShotUID })
    .write();

  const snapshots =
    db
      .get("projects")
      .find({ studyUID })
      .get("snapshots")
      .value() || [];

  db.get("projects")
    .find({ studyUID })
    .assign({ snapshots: [...snapshots, snapShotUID] })
    .write();
};
