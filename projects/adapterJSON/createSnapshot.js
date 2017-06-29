import fs from "fs";
import low from "lowdb";
import uuid from "uuid";
import queryProjectSnapshot from './queryProjectSnapshot';
import { checkExists, path } from './index';

export default async ({ studyUID = "_", payload = {} }) => {
  checkExists(); // TODO Wrap this in high order function
  if (path === undefined) return;
  
  const snapShotUID = uuid();

  // Query last snapshot and merge
  const lastSnapshot = await queryProjectSnapshot({ studyUID });

  const mergedPayload = {
    ...lastSnapshot,
    ...payload,
  };

  fs.writeFileSync(
    `${path}/snapshots/${snapShotUID}.json`,
    JSON.stringify(mergedPayload)
  );

  const db = low(`${path}/projects.json`);
  const ret = db.get("projects").find({ studyUID: studyUID }).value();

  if (ret === undefined) {
    // create
    db
      .get("projects")
      .push({ studyUID, status: 0, client: 0, snapshot: snapShotUID, snapshots: [snapShotUID] })
      .write();
  } else {
    // update
    db
      .get("projects")
      .find({ studyUID })
      .assign({ snapshot: snapShotUID })
      .write()

    const snapshots = db
      .get("projects")
      .find({ studyUID })
      .get('snapshots')
      .value();

    db
      .get("projects")
      .find({ studyUID })
      .assign({ snapshots: [...snapshots, snapShotUID] })
      .write()

    // console.log('snapshots', snapshots);
    // add snapshot to array
  }
};