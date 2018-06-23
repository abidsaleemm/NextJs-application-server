import queryTableAll from "../../helpers/azure/queryTableAll";
import { tableService, tableName, createTable } from "./";
import hasProjectSnapshots from "./hasProjectSnapshots";

// TODO Messy and duplicate code.  Might want to map getProject.
export default async () => {
  await createTable();

  const values = await queryTableAll({ tableService, tableName });

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
        hasProjectSnapshots: await hasProjectSnapshots({ studyUID })
      })
    )
  );
};
