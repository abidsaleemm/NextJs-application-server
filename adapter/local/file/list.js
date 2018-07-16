import fs from "fs";

export default async ({ path }) => {
  if (fs.existsSync(path) !== false) {
    // TODO test if directory?
    const files = fs.readdirSync(path);
    return files;
  }

  return [];
};
