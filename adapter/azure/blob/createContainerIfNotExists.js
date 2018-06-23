export default ({ tableName, blobService }) =>
  new Promise((resolve, reject) =>
    blobService.createContainerIfNotExists(
      tableName,
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
