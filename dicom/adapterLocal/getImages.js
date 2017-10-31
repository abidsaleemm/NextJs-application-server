import fs from "fs";
import { path as root, images } from "./";
import parseRaw from "../parseRaw";

export default async ({ seriesUID }) =>
  await Promise.all(
    Object.values(images)
      .filter(f => f.seriesUID === seriesUID)
      .sort((a, b) => a.imageNumber - b.imageNumber)
      .map(({ instanceUID, path }) => ({ instanceUID, path }))
      .map(
        ({ path }) =>
          new Promise(resolve =>
            fs.readFile(`${root}/${path}`, (error, data) =>
              resolve(parseRaw(data, { path }))
            )
          )
      )
  );
