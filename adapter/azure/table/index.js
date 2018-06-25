import azure from "azure-storage";

import createTableIfNotExists from "./createTableIfNotExists";
import insertOrMergeEntity from "./insertOrMergeEntity";
import queryTable from "./queryTable";
import queryTableAll from "./queryTableAll";
import mergeEntity from "./mergeEntity";

export default () => {
  const tableService = azure.createTableService(
    process.env.STORAGE_ACCOUNT,
    process.env.STORAGE_ACCOUNT_KEY
  );

  return {
    createTableIfNotExists: async props =>
      createTableIfNotExists({ ...props, tableService }),
    insertOrMergeEntity: async props =>
      insertOrMergeEntity({ ...props, tableService }),
    queryTable: async props => queryTable({ ...props, tableService }),
    queryTableAll: async props =>
      queryTableAll({ ...props, tableService }),
    mergeEntity: async props =>
      mergeEntity({ ...props, tableService })
  };
};
