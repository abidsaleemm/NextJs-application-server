import azure from "azure-storage";
import readFile from "./helpers/readFile";
import queryTable from "./helpers/queryTable";
import parseRaw from "../parseRaw";
import { tablePrefix } from "./";
import pullBlob from "./helpers/pullBlob";

export default async ({ instanceUID }) =>
  parseRaw(await pullBlob({ instanceUID }));
