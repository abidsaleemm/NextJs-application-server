import azure from "azure-storage";
import hasProjectSnapshots from "./hasProjectSnapshots";

export default async ({
  studyUID = "",
  tableName,
  tableAdapter: { queryTable },
  ...props
}) => {
  const project = await queryTable({
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
        containerName: tableName,
        studyUID
      })
    };
  }
};
