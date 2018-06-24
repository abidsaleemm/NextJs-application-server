import azure from "azure-storage";
// import queryTable from "../../helpers/azure/queryTable";
import { queryTable } from "../table";
// import { tableService, tableName, createTable } from "./";
import hasProjectSnapshots from "./hasProjectSnapshots";

export default async ({
  studyUID = "",
  tableService,
  tableName,
  ...props
}) => {
  //   await createTable();

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
        deleted,
        sample
      } = {}
    } = project;

    return {
      studyUID,
      status,
      defaultStudyUID,
      multusID,
      encoding,
      deleted,
      sample,
      hasProjectSnapshots: await hasProjectSnapshots({
        ...props,
        studyUID
      })
    };
  }
};
