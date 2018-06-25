export default ({ blobService, containerName, blobName }) =>
  new Promise((resolve, reject) =>
    blobService.deleteBlobIfExists(containerName, blobName, err => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    })
  );
