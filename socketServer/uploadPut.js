import dataUriToBuffer from "data-uri-to-buffer";
import { Readable } from "stream";
import pageProjects from "./pageProjects";
import { fetchAction } from "../actions";
let debug = require('debug')('debug');

export default async ({
  socket,
  action: { data, studyUID, name } = {},
  user,
  adapter
}) => {
  const {
    file: { put: uploadPut = () => {} }
  } = adapter;

  const decoded = dataUriToBuffer(data);

  const stream = new Readable();
  stream.push(decoded);
  stream.push(null);

  const path = `${studyUID}/${name}`;

  await uploadPut({ path, stream });

  debug("Upload done", name);

  socket.emit("action", fetchAction(false)); // TODO Do we stll use this?
  pageProjects({ socket, user, adapter });
};
