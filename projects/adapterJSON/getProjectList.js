import fs from "fs";
import low from "lowdb";
import FileSync from 'lowdb/adapters/FileSync';

import { checkExists, path } from './index';

export default  async () => {
  checkExists();
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();
  const projects = db.get("projects").value();

  // Strip unused props
  return projects.map(({ studyUID, status }) => ({ studyUID, status }));
};