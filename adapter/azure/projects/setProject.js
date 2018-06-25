import { insertOrMergeEntity } from "../table";

export default async ({
  studyUID,
  props: propsProject = {},
  tableName,
  tableAdapter: { insertOrMergeEntity }
  //   ...props
}) => {
  if (!studyUID) {
    return;
  }

  const entity = {
    PartitionKey: studyUID, // TODO PartitionKey and RowKey the same?
    RowKey: studyUID,
    ...propsProject
  };

  await insertOrMergeEntity({ tableName, entity });
  //   await createTable();
  //   await new Promise((resolve, reject) => {
  //     tableService.insertOrMergeEntity(
  //       tableName,
  //       entity,
  //       (error, result, response) => {
  //         if (error) {
  //           reject(error);
  //           return;
  //         }

  //         resolve(result);
  //       }
  //     );
  //   });
};
