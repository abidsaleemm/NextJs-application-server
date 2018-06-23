export default ({ tableName, tableService }) =>
  new Promise((resolve, reject) =>
    tableService.createTableIfNotExists(
      tableName,
      (error, result, response) => {
        if (error) {
          console.log("error", error);
          reject(error);
          return;
        }

        resolve(result);
      }
    )
  );
