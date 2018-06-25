import hasProjectSnapshots from "./hasProjectSnapshots";

// TODO Messy and duplicate code.  Might want to map getProject?
export default async ({
  tableName,
  tableAdapter: { queryTableAll },
  ...props
}) => {
  const values = await queryTableAll({ tableName });

  return Promise.all(
    values.map(
      async ({
        RowKey: studyUID,
        status = 0,
        defaultName,
        multusID,
        encoding,
        deleted,
        sample
      }) => ({
        studyUID,
        status,
        defaultName,
        multusID,
        encoding,
        deleted,
        sample,
        hasProjectSnapshots: await hasProjectSnapshots({
          ...props,
          containerName: tableName,
          studyUID
        })
      })
    )
  );
};
