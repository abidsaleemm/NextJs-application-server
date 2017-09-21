import fs from 'fs';
import os from 'os';

export default async ({ session, index, data }) => {
  const dirPath = `${os.tmpdir()}/${session}`;

  try {
    fs.mkdirSync(dirPath); // Create if does not exist
  } catch (e) {}

  const fileName = index.toString().padStart(4, '0');
  const fullPath = `${dirPath}/${fileName}.png`;

  fs.writeFileSync(fullPath, data);
};
