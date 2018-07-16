import fs from "fs";

export default async ({ path }) => {
  if (fs.existsSync(path)) {
    return fs.createReadStream(path);
  }
};
