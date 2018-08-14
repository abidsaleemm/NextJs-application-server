export default async ({ studyUID = "", containerName, blobAdapter: { getBlobToText, doesBlobExist } }) => {
  const exists = await doesBlobExist({ blobName: studyUID, containerName });

  if (!exists) {
    return;
  }
  const json = await getBlobToText({
    containerName,
    blobName: studyUID
  });

  // TODO Catch exceptions for JSON.parse? WG
  return JSON.parse(json);
};
