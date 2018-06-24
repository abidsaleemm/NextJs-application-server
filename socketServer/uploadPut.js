import dataUriToBuffer from "data-uri-to-buffer";
import { Readable } from "stream";
import pageProjects from "./pageProjects";
import { fetchAction } from "../actions";
import { adapter } from "../server";

export default async ({
  socket,
  action: { data, studyUID, name } = {},
  user
}) => {
  const { upload: { put: uploadPut = () => {} } = {} } = adapter;

  const decoded = dataUriToBuffer(data);

  const stream = new Readable();
  stream.push(decoded);
  stream.push(null);

  await uploadPut({ studyUID, name, stream });
  console.log("Upload done", name);

  socket.emit("action", fetchAction(false));
  pageProjects({ socket, user });
};
