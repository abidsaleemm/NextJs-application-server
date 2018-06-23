export default ({ tableService, tableName, entity }) =>
  new Promise((resolve, reject) => {
    tableService.insertOrMergeEntity(
      tableName,
      entity,
      (error, result, response) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );
  });
