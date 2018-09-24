import fs from "fs";
import os from "os";
import path from "path";

export default async ({ root = os.tmpdir(), session, filePath, data }) => {
  const fullPath = `${root}/${session}/${filePath}`;
  const dirPath = path.dirname(fullPath);

  try {
    fs.mkdirSync(dirPath);
  } catch (e) {}

  fs.writeFileSync(fullPath, data);
};
