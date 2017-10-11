import os from 'os';
import rimraf from "rimraf";

export default async ({ session }) =>
  new Promise((resolve, reject) =>
    rimraf(
      `${os.tmpdir}/${session}`,
      err => (err ? reject(err) : resolve())
    )
  );
