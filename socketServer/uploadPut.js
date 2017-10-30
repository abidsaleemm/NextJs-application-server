import dataUriToBuffer from "data-uri-to-buffer";
import { Readable } from 'stream';
import { put as uploadPut } from "../upload";
import pagePortal from "./pagePortal";

export default async ({
  socket,
  action: { data, studyUID, name } = {},
  // user: { id: clientID }
  user,
}) => {
  const decoded = dataUriToBuffer(data);

  const stream = new Readable();
  stream.push(decoded);
  stream.push(null);

  console.log("uploadPut", studyUID, name, stream);

  await uploadPut({ studyUID, name, stream });
  console.log("Upload done", name);

  pagePortal({ socket, user });
};
