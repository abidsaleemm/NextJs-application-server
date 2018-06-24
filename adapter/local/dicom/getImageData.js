import fs from "fs";
import { path as root, images } from "./";
import parseRaw from "./dicompParseRaw";

export default async ({ instanceUID }) => {
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
