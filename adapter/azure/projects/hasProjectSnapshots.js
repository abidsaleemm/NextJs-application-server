export default async ({
  studyUID = "",
  containerName,
  blobAdapter: { getBlobProperties }
}) => {
  return await getBlobProperties({
    containerName,
    blobName: studyUID
  });
};
