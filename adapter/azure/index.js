import dicom from "./dicom";
import projects from "./projects";
import file from "./file";
import users from "./users";
import blob from "./blob";
import table from "./table";

export default ({ storageAccount, storageKey }) => {
  const projectsTableName = process.env.PROJECT_TABLE || "projects";

  const blobAdapter = blob({ storageAccount, storageKey });
  const tableAdapter = table({ storageAccount, storageKey });

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
