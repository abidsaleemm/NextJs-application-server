import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export default async ({ studyUID = "", path }) => {
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();

  // Querying snapshots here?
  const { snapshots = [] } = db
    .get("projects")
    .find({ studyUID: studyUID })
    .value();

  return snapshots;
};
