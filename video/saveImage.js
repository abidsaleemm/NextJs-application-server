import fs from "fs";
import os from "os";

export default async ({ session, index, data }) => {
  const dirPath = `${os.tmpdir()}/${session}/frames`;

  // Create if does not exist
  try {
    fs.mkdirSync(`${os.tmpdir()}/${session}`);
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
