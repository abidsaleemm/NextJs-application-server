export default ({ blobService, containerName, blobName }) =>
  new Promise((resolve, reject) => {
    blobService.getBlobProperties(
      containerName,
      blobName,
      (error, properties, status) => {
        if (error) {
          const { statusCode } = error;

          if (statusCode === 404) {
            resolve(false);
            return;
          }

          reject(error);
          return;
        }

        // issue-18
        if (status.isSuccessful) {
          resolve(true);
        }
      }
    );
  });
