import { BlobUtilities } from "azure-storage";
import { deleteBlob } from "../blob";

export default async ({ studyUID, tableName, ...props }) => {
  if (!studyUID) return;

  // TODO Any of this reusable and should be placed in healers?
  // Remove Blob and snapshots
  const options = {
    deleteSnapshots:
      BlobUtilities.SnapshotDeleteOptions.BLOB_AND_SNAPSHOTS
  };

  await deleteBlob({
    ...props,
    blobName: studyUID,
    containerName: tableName,
    options
  });

  //   await new Promise((resolve, reject) => {
  //     blobService.deleteBlob(
  //       tableName,
  //       studyUID,
  //       options,
  //       (error, result) => {
  //         if (error) {
  //           console.log("error destroyProject blob", error);
  //           return reject(error);
  //         }

  //         resolve(result);
  //       }
  //     );
  //   });
};
