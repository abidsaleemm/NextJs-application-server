import azure from "azure-storage";
import hasProjectSnapshots from "./hasProjectSnapshots";

export default async ({ studyUID = "", tableName, tableAdapter: { queryTable }, ...props }) => {
  const project = await queryTable({
    tableName,
    query: new azure.TableQuery().where("RowKey eq ?", studyUID)
  });

  if (project.length > 0) {
    const { 0: { status = "None", defaultStudyUID, multusID, notes = "", encoding, deleted, sample, userID } = {} } = project;

    return {
      studyUID,
      status,
      defaultStudyUID,
      multusID,
      encoding,
      deleted,
      userID,
      notes,
      sample: sample === "" ? false : sample ? true : false,
      hasProjectSnapshots: await hasProjectSnapshots({
        ...props,
        containerName: tableName,
        studyUID
      })
    };
  }
};
