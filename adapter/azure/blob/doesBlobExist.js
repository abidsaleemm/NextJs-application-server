export default ({ blobService, blobName, containerName }) =>
  new Promise((resolve, reject) =>
    blobService.doesBlobExist(
      containerName,
      blobName,
      (err, { exists }) => {
        if (err) {
          return reject(err);
        }

        resolve(exists);
      }
    )
  );
