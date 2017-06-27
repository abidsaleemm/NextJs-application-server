import fs from "fs";
import low from "lowdb";

import { checkExists, path } from './index';

export default async ({ studyUID = '', status = 0 }) => {
    checkExists();
    if (path === undefined) return;

    const db = low(`${path}/projects.json`);
    db.defaults({ projects: [] }).write();

    db
        .get("projects")
        .find({ studyUID })
        .assign({ status })
        .write()
};