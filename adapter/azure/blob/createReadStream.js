export default async ({ blobService, blobName, containerName }) =>
  blobService.createReadStream(
    containerName,
    blobName,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(
        `blob loaded ${result.contentLength} bytes.`,
        blobName
      );
    }
  );
