import getProjectSnapshot from "./getProjectSnapshot";

export default async ({
  studyUID = "_",
  payload = {},
  tableName,
  blobAdapter,
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

  // If An existing payload exists retrieve last and merge with new changes
  let payloadMerged = payload;
  if (exists === true) {
    await createBlobSnapshot({
      containerName: tableName,
      blobName: studyUID
    });

    // Get existing payload and merge
    // TODO There must be a more efficient way to handle this
    const lastSnapshot =
      (await getProjectSnapshot({
        studyUID,
        containerName: tableName,
        blobAdapter
      })) || {};

    payloadMerged = {
      ...lastSnapshot,
      ...payloadMerged
    };
  }

  // TODO Catch exceptions for JSON.parse?
  const json = JSON.stringify(payloadMerged);

  await createBlockBlobFromText({
    containerName: tableName,
    blobName: studyUID,
    text: json
  });
};
