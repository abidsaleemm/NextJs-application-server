import dicom from "./dicom";
import projects from "./projects";
import file from "./file";
import users from "./users";
import blob from "./blob";
import table from "./table";

export default () => {
  // TODO Should this be done in table adapter?
  const projectsTableName = process.env.PROJECT_TABLE || "projects";

  const blobAdapter = blob();
  const tableAdapter = table();

  return {
    // Higher order adapters
    dicom: dicom({ blobAdapter, tableAdapter }),
    projects: projects({
      blobAdapter,
      tableAdapter,
      tableName: projectsTableName
    }),
    //
    file: file({ blobAdapter }),
    users: users({ tableAdapter })
  };
};
