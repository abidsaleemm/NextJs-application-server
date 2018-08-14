export default ({ tableService, tableName, key, partitionKey }) =>
  new Promise((resolve, reject) => {
    const task = {
      PartitionKey: { _: partitionKey ? partitionKey : key },
      RowKey: { _: key }
    };

    tableService.deleteEntity(tableName, task, (error, response) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
