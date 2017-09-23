import fs from 'fs';
import rimraf from "rimraf";

export default async ({ session }) => fs.unlinkSync(`${os.tmpdir}/${session}.mp4`);
