export default async ({
  studyUID = "_",
  payload = {},
  tableName,
  blobAdapter: {
    createBlobSnapshot,
    getBlobProperties,
    createBlockBlobFromText
  }
}) => {
  const exists = await getBlobProperties({
    containerName: tableName,
    blobName: studyUID
  });

  if (exists === true) {
    await createBlobSnapshot({
      containerName: tableName,
      blobName: studyUID
    });
  }

  // TODO Catch exceptions for JSON.parse?
  const json = JSON.stringify(payload);

  await createBlockBlobFromText({
    containerName: tableName,
    blobName: studyUID,
    text: json
  });
};
