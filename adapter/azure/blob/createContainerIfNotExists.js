export default ({ containerName, blobService }) =>
  new Promise((resolve, reject) =>
    blobService.createContainerIfNotExists(
      containerName,
      (error, result, response) => {
        if (error) {
          // Container exists and is private
          console.log("error", error);
          reject(error);
          return;
        }

        resolve(result);
      }
    )
  );
