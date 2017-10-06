import azure from "azure-storage";

// TODO Move this under helpers?  Reusable.
export const blobService = azure.createBlobService(
    process.env.STORAGE,
    process.env.STORAGE_KEY
);

export const tableService = azure.createTableService(
    process.env.STORAGE,
    process.env.STORAGE_KEY
);

export const tablePrefix = process.env.DICOM_CONTAINER || 'dicom';

export { default as getSeries } from './getSeries';
export { default as getStudies } from './getStudies';
export { default as getStudy } from './getStudy'; 
export { default as getImages } from './getImages';
