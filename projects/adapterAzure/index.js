import azure from "azure-storage";

export { default as createSnapshot } from './createSnapshot';
export { default as queryProject } from './queryProject';
export { default as queryProjectList } from './queryProjectList'; 
export { default as queryProjectSnapshot } from './queryProjectSnapshot';
export { default as setProjectClient } from './setProjectClient';
export { default as setProjectStatus } from './setProjectStatus';

export const tableName = 'projects';

export const blobService = azure.createBlobService(
    process.env.APPSETTING_STORAGE2,
    process.env.APPSETTING_STORAGE2_KEY
);

export const tableService = azure.createTableService(
    process.env.APPSETTING_STORAGE,
    process.env.APPSETTING_STORAGE_KEY
);

// TODO wrap functions so pre processing can be done such as Blob and Table creation