import { tableService, tableName, createTable } from './';

export default async ({ studyUID = '', props = {} }) => {
    await createTable();
    await (new Promise((resolve, reject) => {
        tableService.insertOrMergeEntity(
            tableName,
            {
                PartitionKey: studyUID, // TODO PartitionKey and RowKey the same?
                RowKey: studyUID,
                ...props,
            },
            (error, result, response) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result)
            }
        );
    }))
};