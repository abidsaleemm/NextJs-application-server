export default async ({
  containerName,
  blobAdapter: { listBlobsSegmentedWithPrefix },
  path
}) => {
  return await listBlobsSegmentedWithPrefix({
    containerName,
    prefix: path
  });
};
