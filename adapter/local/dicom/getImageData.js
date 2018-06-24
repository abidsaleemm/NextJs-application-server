import fs from "fs";
// import { path as root, images } from "./";
import parseRaw from "./dicomParseRaw";

export default async ({ instanceUID, path: root, images = {} }) => {
  // Lookup image
  const { path } =
    Object.values(images).find(f => f.instanceUID === instanceUID) ||
    {};

  if (path) {
    const data = fs.readFileSync(`${root}/${path}`);
    const { pixelData } = parseRaw(data, { path });

    return pixelData;
  }
};
