import dataUriToBuffer from "data-uri-to-buffer";
import { Readable } from "stream";
import { put as uploadPut } from "../upload";
import pageProjects from "./pageProjects";
import { fetchAction } from "../actions";

export default async ({
  socket,
  action: { data, studyUID, name } = {},
  user
}) => {
  const decoded = dataUriToBuffer(data);

  const stream = new Readable();
  stream.push(decoded);
  stream.push(null);

  await uploadPut({ studyUID, name, stream });
  console.log("Upload done", name);

  socket.emit("action", fetchAction(false));
  pageProjects({ socket, user });
};
