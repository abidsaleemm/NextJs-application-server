import os from "os";
import rimraf from "rimraf";

export default async ({ root = os.tmpdir(), session }) =>
  new Promise((resolve, reject) =>
    rimraf(`${root}/${session}`, err => (err ? reject(err) : resolve()))
  );
