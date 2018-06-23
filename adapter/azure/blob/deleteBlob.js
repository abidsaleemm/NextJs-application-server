export default ({ blobService, containerName, blobName, options }) =>
  new Promise((resolve, reject) => {
    blobService.deleteBlob(
      containerName,
      blobName,
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
