import fs from "fs";
import { path as root, images } from "./";
import parseRaw from "../parseRaw";

export default async ({ instanceUID }) => {
  // Lookup image
  const { path } =
    Object.values(images).find(f => f.instanceUID === instanceUID) ||
    {};

  if (path) {
    return await new Promise(resolve =>
      fs.readFile(`${root}/${path}`, (error, data) =>
        resolve(parseRaw(data, { path }))
      )
    );
  }
};
