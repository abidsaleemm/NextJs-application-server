import fs from "fs";
import os from "os";
import path from "path";

export default async ({ session, filePath, data }) => {
  const fullPath = `${os.tmpdir()}/${session}/${filePath}`;
  const dirPath = path.dirname(fullPath);

  try {
    fs.mkdirSync(dirPath);
  } catch (e) {}

  fs.writeFileSync(fullPath, data);
};
