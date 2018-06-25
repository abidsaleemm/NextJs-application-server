export default async ({
  studyUID,
  props: propsProject = {},
  tableName,
  tableAdapter: { insertOrMergeEntity }
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
};
