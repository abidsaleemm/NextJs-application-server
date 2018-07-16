export default async ({
  stream,
  containerName,
  blobAdapter: { createWriteStreamToBlockBlob },
  path
}) => {
  return await createWriteStreamToBlockBlob({
    containerName,
    blobName: path,
    readStream: stream
  });
};
