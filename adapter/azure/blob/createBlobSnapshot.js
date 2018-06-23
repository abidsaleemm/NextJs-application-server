export default ({ blobService, containerName, blobName }) =>
  new Promise((resolve, reject) =>
    blobService.createBlobSnapshot(
      containerName,
      blobName,
      (error, snapshotId) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    )
  );
