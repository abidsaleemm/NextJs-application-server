import fs from 'fs';
import os from 'os';
import rimraf from "rimraf";

export default async ({ session }) => fs.unlinkSync(`${os.tmpdir}/${session}.mp4`);
