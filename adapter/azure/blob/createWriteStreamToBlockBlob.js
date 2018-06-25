export default ({
  blobService,
  blobName,
  containerName,
  readStream
}) =>
  new Promise((resolve, reject) => {
    const writeStream = blobService.createWriteStreamToBlockBlob(
      containerName,
      blobName,
      (err, result) => {
        if (err) {
          return reject(err);
        }

        console.log("Blob uploaded.", blobName); // TODO Please remove this after working.
        resolve(result);
      }
    );

    readStream.pipe(writeStream);
  });
