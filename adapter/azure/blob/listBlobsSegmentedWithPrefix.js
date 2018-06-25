export default ({ blobService, containerName, prefix }) =>
  new Promise((resolve, reject) => {
    blobService.listBlobsSegmentedWithPrefix(
      containerName,
      prefix,
      null,
      (error, { entries = [] }) => {
        if (error) {
          console.log("error list", error);
          reject(error);
          return;
        }

        resolve(
          entries.map(({ name = "" }) => name.split("/").pop())
        );
      }
    );
  });
