export default ({ tableService, tableName, entity }) =>
  new Promise((resolve, reject) => {
    tableService.mergeEntity(
      tableName,
      entity,
      (error, result, response) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
