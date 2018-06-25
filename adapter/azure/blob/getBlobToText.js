export default ({ blobService, containerName, blobName }) =>
  new Promise((resolve, reject) =>
    blobService.getBlobToText(
      containerName,
      blobName,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    )
  );
