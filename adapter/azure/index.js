import azure from "azure-storage";

import dicom from "./dicom";
import projects from "./projects";
import upload from "./upload";
import users from "./users";
import video from "./video";

export default () => {
  const blobService = azure.createBlobService(
    process.env.STORAGE_ACCOUNT,
    process.env.STORAGE_ACCOUNT_KEY
  );

  const tableService = azure.createTableService(
    process.env.STORAGE_ACCOUNT,
    process.env.STORAGE_ACCOUNT_KEY
  );

  const tableName = process.env.PROJECT_TABLE || "projects";

  return {
    dicom: async () => await dicom({ blobService, tableService }),
    projects: async () =>
      await projects({ blobService, tableService, tableName }),
    upload: async () => await upload(),
    users: async () => await users(),
    video: async () => await video()
  };
};
