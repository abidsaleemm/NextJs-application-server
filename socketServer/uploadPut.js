import dataUriToBuffer from "data-uri-to-buffer";
import { Readable } from "stream";
import { put as uploadPut } from "../upload";
import pagePortal from "./pagePortal";
import { fetchAction } from "../actions";

export default async ({
  socket,
  action: { data, studyUID, name } = {},
  user
}) => {
  await socket.emit("action", fetchAction(true));
  const decoded = dataUriToBuffer(data);

  const stream = new Readable();
  stream.push(decoded);
  stream.push(null);

  await uploadPut({ studyUID, name, stream });
  console.log("Upload done", name);

  pagePortal({ socket, user });
};
