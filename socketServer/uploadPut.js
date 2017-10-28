import { put as uploadPut } from '../upload';

export default async ({ socket, action: { data, studyUID, name } = {}}) => {
  const decoded = dataUriToBuffer(data);
  
  const stream = new Readable;
  stream.push(decoded);
  stream.push(null);

  await uploadPut({ studyUID, name, stream });
  done("Upload done", name);
  // TODO just send updated project query
};
