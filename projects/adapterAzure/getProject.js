import azure from "azure-storage";
import queryTable from "../../helpers/azure/queryTable";
import { tableService, tableName, createTable } from "./";
import setProject from "./setProject";

export default async ({ studyUID = "" }) => {
  await createTable();
  const project = await queryTable({
    tableService,
    tableName,
    query: new azure.TableQuery().where("RowKey eq ?", studyUID)
  });

  if (project.length > 0) {
    const { 0: { status = 0, defaultName } = {} } = project;
    return {
      studyUID,
      status,
      defaultName
    };
  }
};
