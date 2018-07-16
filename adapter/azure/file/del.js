export default async ({
  containerName,
  blobAdapter: { deleteBlob },
  path
}) => {
  return await deleteBlob({
    containerName,
    blobName: path
  });
};
