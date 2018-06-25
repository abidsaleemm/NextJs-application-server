import { BlobUtilities } from "azure-storage";

export default async ({
  studyUID,
  tableName,
  blobAdapter: { deleteBlob }
}) => {
  if (!studyUID) return;

  // TODO Any of this reusable and should be placed in healers?
  // Remove Blob and snapshots
  const options = {
    deleteSnapshots:
      BlobUtilities.SnapshotDeleteOptions.BLOB_AND_SNAPSHOTS
  };

  await deleteBlob({
    blobName: studyUID,
    containerName: tableName,
    options
  });
};
