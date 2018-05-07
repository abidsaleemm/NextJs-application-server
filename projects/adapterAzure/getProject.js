import azure from "azure-storage";
import queryTable from "../../helpers/azure/queryTable";
import { tableService, tableName, createTable } from "./";
import hasProjectSnapshots from "./hasProjectSnapshots";

export default async ({ studyUID = "" }) => {
  await createTable();
  const project = await queryTable({
    tableService,
    tableName,
    query: new azure.TableQuery().where("RowKey eq ?", studyUID)
  });

  if (project.length > 0) {
    const {
      0: {
        status = 0,
        defaultStudyUID,
        multusID,
        encoding,
        deleted
      } = {}
    } = project;
    return {
      studyUID,
      status,
      defaultStudyUID,
      multusID,
      encoding,
      deleted,
      hasProjectSnapshots: await hasProjectSnapshots({ studyUID })
    };
  }
};
