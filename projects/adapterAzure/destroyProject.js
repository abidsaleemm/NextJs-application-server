import { BlobUtilities } from "azure-storage";
import {
  blobService,
  tableService,
  tableName,
  createContainer
} from "./";

export default async ({ studyUID }) => {
  if (!studyUID) return;
  await createContainer();

  // TODO Any of this reusable and should be placed in healers?
  // Remove Blob and snapshots
  const options = {
    deleteSnapshots:
      BlobUtilities.SnapshotDeleteOptions.BLOB_AND_SNAPSHOTS
  };

  await new Promise((resolve, reject) => {
    blobService.deleteBlob(
      tableName,
      studyUID,
      options,
      (error, result) => {
        if (error) {
          console.log("error destroyProject blob", error);
          return reject(error);
        }

        resolve(result);
      }
    );
  });

  // TODO Keep project table but remove all snapshots
  // Remove from table view
  // await new Promise((resolve, reject) => {
  //   const task = {
  //     RowKey: studyUID,
  //     PartitionKey: studyUID
  //   };

  //   tableService.deleteEntity(tableName, task, (error, response) => {
  //     if (error) {
  //       console.log("error destroyProject table", error);
  //       return reject(error);
  //     }

  //     resolve(response);
  //   });
  // });
};
