import azure from "azure-storage";

export { default as getProject } from "./getProject";
export { default as getProjectList } from "./getProjectList";
export { default as getProjectSnapshot } from "./getProjectSnapshot";
export { default as setProject } from "./setProject";
export { default as setProjectSnapshot } from "./setProjectSnapshot";
export { default as destroyProject } from "./destroyProject";

export const tableName = process.env.PROJECT_TABLE || "projects";

// TODO Should be moved to helpers?
export const blobService = azure.createBlobService(
  process.env.STORAGE,
  process.env.STORAGE_KEY
);

// TODO Should be moved to helpers?
export const tableService = azure.createTableService(
  process.env.STORAGE,
  process.env.STORAGE_KEY
);

// TODO Should be moved to helpers?
export const createTable = () =>
  new Promise((resolve, reject) =>
    tableService.createTableIfNotExists(
      tableName,
      (error, result, response) => {
        if (error) {
          console.log("error", error);
          reject(error);
          return;
        }

        resolve(result);
      }
    )
  );

// TODO Should be moved to helpers?
export const createContainer = () =>
  new Promise((resolve, reject) =>
    blobService.createContainerIfNotExists(
      tableName,
      (error, result, response) => {
        if (error) {
          // Container exists and is private
          console.log("error", error);
          reject(error);
          return;
        }

        resolve(result);
      }
    )
  );
