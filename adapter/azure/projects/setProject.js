// import { tableService, tableName, createTable } from "./";
import { insertOrMergeEntity } from "../table";

export default async ({
  studyUID,
  props: propsProject = {},
  ...props
}) => {
  if (!studyUID) {
    return;
  }

  const entity = {
    PartitionKey: studyUID, // TODO PartitionKey and RowKey the same?
    RowKey: studyUID,
    ...propsProject
  };

  await insertOrMergeEntity({ ...props, entity });
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
