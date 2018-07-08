import dicom from "./dicom";
import projects from "./projects";
import upload from "./upload";
import users from "./users";
import video from "./video";
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
    upload: upload({ blobAdapter, tableAdapter }),
    users: users({ tableAdapter }),
    video: video({ blobAdapter, tableAdapter })
  };
};
