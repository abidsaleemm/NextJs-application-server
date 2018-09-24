import fs from "fs";
import os from "os";

export default async ({ root = os.tmpdir(), session, index, data }) => {
  const dirPath = `${root}/${session}/frames`;

  // Create if does not exist
  try {
    fs.mkdirSync(`${root}/${session}`);
  } catch (e) {}

  try {
    fs.mkdirSync(dirPath);
  } catch (e) {}

  const fileName = index.toString().padStart(4, "0");
  const fullPath = `${dirPath}/${fileName}.jpg`;

  const fd = fs.openSync(fullPath, "w");
  fs.writeSync(fd, data);
  fs.closeSync(fd);
};
