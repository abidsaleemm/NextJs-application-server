import low from "lowdb";
import FileSync from 'lowdb/adapters/FileSync';
import { checkExists, path } from './index';

export default async ({ studyUID = '' }) => {
  checkExists();
  if (path === undefined) return;

  const db = low(new FileSync(`${path}/projects.json`));
  db.defaults({ projects: [] }).write();

  const { status, client } = db.get("projects").find({ studyUID: studyUID }).value();
  return { studyUID, status, client };
};