import fs from "fs";
import low from "lowdb";

import { checkExists, path } from './index';

export default async ({ studyUID = '' }) => {
  checkExists();
  if (path === undefined) return;

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