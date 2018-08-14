import azure from "azure-storage";

import createTableIfNotExists from "./createTableIfNotExists";
import insertOrMergeEntity from "./insertOrMergeEntity";
import queryTable from "./queryTable";
import queryTableAll from "./queryTableAll";
import mergeEntity from "./mergeEntity";
import deleteEntity from "./deleteEntity";

export default ({ storageAccount, storageKey }) => {
  const tableService = azure.createTableService(storageAccount, storageKey);

  return {
    createTableIfNotExists: async props => createTableIfNotExists({ ...props, tableService }),
    insertOrMergeEntity: async props => insertOrMergeEntity({ ...props, tableService }),
    queryTable: async props => queryTable({ ...props, tableService }),
    queryTableAll: async props => queryTableAll({ ...props, tableService }),
    mergeEntity: async props => mergeEntity({ ...props, tableService }),
    deleteEntity: async props => deleteEntity({ ...props, tableService })
  };
};
