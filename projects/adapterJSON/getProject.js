import low from "lowdb";

import { checkExists, path } from './index';

export default async ({ studyUID = '' }) => {
  checkExists();
  if (path === undefined) return;

  const db = low(`${path}/projects.json`);
  db.defaults({ projects: [] }).write();

  const project = db.get("projects").find({ studyUID: studyUID }).value();
  return project;
};