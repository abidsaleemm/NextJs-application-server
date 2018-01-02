import queryTableAll from "../../helpers/azure/queryTableAll";
import { tableService, tableName, createTable } from "./";

// TODO Messy and duplicate code.  Might want to map getProject.
export default async () => {
  await createTable();

  const values = await queryTableAll({ tableService, tableName });

  return values.map(
    ({ RowKey: studyUID, status = 0, defaultName, multusID }) => ({
      studyUID,
      status,
      defaultName,
      multusID
    })
  );
};
