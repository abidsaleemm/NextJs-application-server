import fs from "fs";
import low from "lowdb";
import FileSync from 'lowdb/adapters/FileSync';

import { checkExists, path } from './index';

// TODO Add functionality to index prev snapshots?
export default async ({ studyUID = '' }) => {
  checkExists();
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));

  db.defaults({ projects: [] }).write();

  const project = db.get("projects").find({ studyUID: studyUID }).value();

  if (project !== undefined) {
    const { snapshot: snapShotUID } = project;
    if (snapShotUID === undefined) return; // No Snapshot.  First value?

    const data = fs.readFileSync(`${path}/snapshots/${snapShotUID}.json`);

    return JSON.parse(data);
  } else {
    return;
  }
};