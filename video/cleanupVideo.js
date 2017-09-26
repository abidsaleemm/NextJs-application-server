import fs from 'fs';
import os from 'os';
import rimraf from "rimraf";

export default async ({ session }) => {
  const filePath = `${os.tmpdir}/${session}.mp4`;

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
