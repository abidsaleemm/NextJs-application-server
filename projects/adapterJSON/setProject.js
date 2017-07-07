import fs from "fs";
import low from "lowdb";

import { checkExists, path } from './index';

export default async ({ studyUID = '', props = {} }) => {
    checkExists();
    if (path === undefined) return;

    const db = low(`${path}/projects.json`);
    db.defaults({ projects: [] }).write();

    // TODO automatically create if doesn't exist
    // db
    //   .get("projects")
    //   .push({ studyUID, status: 0, client: 0, snapshot: snapShotUID, snapshots: [snapShotUID] })
    //   .write();
    
    db
        .get("projects")
        .find({ studyUID })
        .assign(props)
        .write()
};

