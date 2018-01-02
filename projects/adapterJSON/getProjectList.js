import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { path } from "./index";

// TODO Messy and duplicate code might want to map getProject.
export default async () => {
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();
  const projects = db.get("projects").value();

  // Strip unused props
  return projects.map(({ studyUID, status, defaultName, multusID }) => ({
    studyUID,
    status,
    defaultName,
    multusID
  }));
};
