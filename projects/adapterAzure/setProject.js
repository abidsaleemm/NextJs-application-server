import { tableService, tableName, createTable } from "./";

export default async ({ studyUID, props = {} }) => {
  if (!studyUID) {
    return;
  }

  const entity = {
    PartitionKey: studyUID, // TODO PartitionKey and RowKey the same?
    RowKey: studyUID,
    ...props
  };

  await createTable();
  await new Promise((resolve, reject) => {
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
};
