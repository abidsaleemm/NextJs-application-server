import azure from "azure-storage";

export const fileService = azure.createFileService(
    process.env.APPSETTING_STORAGE2,
    process.env.APPSETTING_STORAGE2_KEY
);

export const tableService = azure.createTableService(
    process.env.APPSETTING_STORAGE,
    process.env.APPSETTING_STORAGE_KEY
);

export { default as querySeries } from './querySeries';
export { default as queryStudies } from './queryStudies';
export { default as queryStudyByUID } from './queryStudyByUID'; 
export { default as readFile } from './readFile';
