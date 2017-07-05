import azure from "azure-storage";

export const fileService = azure.createFileService(
    process.env.APPSETTING_STORAGE2,
    process.env.APPSETTING_STORAGE2_KEY
);

export const tableService = azure.createTableService(
    process.env.APPSETTING_STORAGE,
    process.env.APPSETTING_STORAGE_KEY
);

export { default as getSeries } from './getSeries';
export { default as getStudies } from './getStudies';
export { default as getStudy } from './getStudy'; 
export { default as getImage } from './getImage';
