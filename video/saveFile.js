import fs from "fs";
import os from "os";

export default async ({ session, filePath, data }) => {
  // TODO Create directories if they don't exist
  const fullPath = `${os.tmpdir()}/${session}/${filePath}`;
  const dirPath = `${os.tmpdir()}/${session}`;

  try {
    fs.mkdirSync(dirPath);
  } catch (e) {}

  fs.writeFileSync(fullPath, data);
};
