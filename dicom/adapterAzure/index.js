import azure from "azure-storage";

// TODO Move this under helpers?  Reusable.
export const blobService = azure.createBlobService(
  process.env.STORAGE_ACCOUNT,
  process.env.STORAGE_ACCOUNT_KEY
);

export const tableService = azure.createTableService(
  process.env.STORAGE_ACCOUNT,
  process.env.STORAGE_ACCOUNT_KEY
);

export const tablePrefix = process.env.CONTAINER_NAME || "dicom";

export { default as getSeries } from "./getSeries";
export { default as getStudies } from "./getStudies";
export { default as getStudy } from "./getStudy";
export { default as getImages } from "./getImages";
export { default as getImageData } from "./getImageData";
export {
  default as getStudiesByPatientID
} from "./getStudiesByPatientID";
