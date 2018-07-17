import doesBlobExist from "./doesBlobExist";

export default async ({ blobService, blobName, containerName }) => {
  const exists = await doesBlobExist({
    blobService,
    blobName,
    containerName
  });

  if (exists) {
    return blobService.createReadStream(
      containerName,
      blobName,
      (err, result) => {
        if (err) {
          //   reject();
          console.log(err);
          return;
        }

        console.log(
          `blob loaded ${result.contentLength} bytes.`,
          blobName,
          result
        );
      }
    );
  }
};
