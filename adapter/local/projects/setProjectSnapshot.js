import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import uuid from "uuid";
import getProjectSnapshot from "./getProjectSnapshot";

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

  // Query last snapshot and merge
  const lastSnapshot =
    (await getProjectSnapshot({ studyUID, path })) || {};
  if (!lastSnapshot) {
    return; // Bailout
  }

  const mergedPayload = {
    ...lastSnapshot,
    ...payload
  };

  // TODO use file adapter
  fs.writeFileSync(
    `${path}/snapshots/${snapShotUID}.json`,
    JSON.stringify(mergedPayload)
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
