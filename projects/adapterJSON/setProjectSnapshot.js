import fs from "fs";
import low from "lowdb";
import uuid from "uuid";
import getProjectSnapshot from './getProjectSnapshot';
import { checkExists, path } from './index';

export default async ({ studyUID = "_", payload = {} }) => {
  checkExists(); // TODO Wrap this in high order function
  if (path === undefined) return;

  // TODO Reuseable?  
  const db = low(`${path}/projects.json`);
  db.defaults({ projects: [] }).write();
  const ret = db.get("projects")
    .find({ studyUID: studyUID })
    .value();

  // If project doesn't exist bailout
  if (ret === undefined) {
    return;
  }

  const snapShotUID = uuid();

  // Query last snapshot and merge
  const lastSnapshot = await getProjectSnapshot({ studyUID }) || {};
  const mergedPayload = {
    ...lastSnapshot,
    ...payload,
  };

  fs.writeFileSync(
    `${path}/snapshots/${snapShotUID}.json`,
    JSON.stringify(mergedPayload)
  );

  db
    .get("projects")
    .find({ studyUID })
    .assign({ snapshot: snapShotUID })
    .write()

  const snapshots = db
    .get("projects")
    .find({ studyUID })
    .get('snapshots')
    .value() || [];

  db
    .get("projects")
    .find({ studyUID })
    .assign({ snapshots: [...snapshots, snapShotUID] })
    .write()

};