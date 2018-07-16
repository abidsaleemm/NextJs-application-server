export default async ({
  containerName,
  blobAdapter: { createReadStream },
  path
}) => {
  return await createReadStream({
    containerName,
    blobName: path
  });
};
