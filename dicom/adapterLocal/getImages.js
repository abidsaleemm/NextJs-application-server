import fs from "fs";
import { path as root, images } from "./";
import parseRaw from "../parseRaw";

export default async ({ seriesUID }) => {
  return Object.values(images)
    .filter(f => f.seriesUID === seriesUID)
    .sort((a, b) => a.imageNumber - b.imageNumber)
    .map(({ instanceUID }) => ({ instanceUID })); // Strip
};
