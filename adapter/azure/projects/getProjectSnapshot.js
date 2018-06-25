export default async ({
  studyUID = "",
  containerName,
  blobAdapter: { getBlobToText }
}) => {
  const json = await getBlobToText({
    containerName,
    blobName: studyUID
  });

  // TODO Catch exceptions for JSON.parse
  return JSON.parse(json);
};
