import { FileWriter } from "wav";
import fs from "fs";
import os from "os";

export const format = {
  audioFormat: 1,
  endianness: "LE",
  channels: 1,
  sampleRate: 16000,
  byteRate: 32000,
  blockAlign: 2,
  bitDepth: 16,
  signed: true
};

export default async ({ root = os.tmpdir(), session, index, data }) => {
  const fileName = `${index.toString().padStart(4, "0")}.wav`;
  const dirPath = `${root}/${session}/audio`;
  const filePath = `${dirPath}/${fileName}`;

  // Create if does not exist
  try {
    fs.mkdirSync(`${root}/${session}`);
  } catch (e) {}

  try {
    fs.mkdirSync(dirPath);
  } catch (e) {}

  const writer = new FileWriter(filePath, format);
  writer.write(data);
  writer.end();
};
