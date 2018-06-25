export default ({ blobService, containerName, blobName, text }) =>
  new Promise((resolve, reject) => {
    const metricStartBlob = new Date();

    blobService.createBlockBlobFromText(
      containerName,
      blobName,
      text,
      (error, response) => {
        if (error) {
          reject();
          return;
        }

        // TODO Remove this debugging infomration at some point.
        console.log(
          `Blob Saved ${blobName} Duration ${(new Date() -
            metricStartBlob) /
            1000} sec`
        );
        resolve();
      }
    );
  });
