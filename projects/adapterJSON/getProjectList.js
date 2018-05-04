import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { path } from "./index";
import hasProjectSnapshots from "./hasProjectSnapshots";

// TODO Messy and duplicate code might want to map getProject.
export default async () => {
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();
  const projects = db.get("projects").value();

  // Strip unused props
  return Promise.all(
    projects.map(
      async ({ studyUID, status, defaultName, multusID, encoding }) => ({
        studyUID,
        status,
        defaultName,
        multusID,
        encoding,
        hasProjectSnapshots: await hasProjectSnapshots({ studyUID })
      })
    )
  );
};
