import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { path } from "./index";

export default async ({ studyUID = "" }) => {
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();

  const project = db
    .get("projects")
    .find({ studyUID: studyUID })
    .value();

  if (project !== undefined) {
    const { status = 0, defaultName, multusID } = project;
    return { studyUID, status, defaultName, multusID };
  }
};
