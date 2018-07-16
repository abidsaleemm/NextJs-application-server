import fs from "fs";
import { default as pathNode } from "path";

export default ({ stream, path }) => {
  const dir = pathNode.dirname(path);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path);
    stream.pipe(writeStream);
    stream.on("end", () => resolve());
    stream.on("error", () => reject());
  });
};
