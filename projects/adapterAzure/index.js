import azure from "azure-storage";

export { default as getProject } from './getProject';
export { default as getProjectList } from './getProjectList';
export { default as getProjectSnapshot } from './getProjectSnapshot';
export { default as setProject } from './setProject';
export { default as setProjectSnapshot } from './setProjectSnapshot';

export const tableName = 'projects'; // TODO Make this some type of arg.

export const blobService = azure.createBlobService(
    process.env.APPSETTING_STORAGE,
    process.env.APPSETTING_STORAGE_KEY
);

export const tableService = azure.createTableService(
    process.env.APPSETTING_STORAGE,
    process.env.APPSETTING_STORAGE_KEY
);

// TODO Should be moved to helpers?
export const createTable = () => new Promise((resolve, reject) =>
    tableService.createTableIfNotExists(
        tableName,
        (error, result, response) => {
            if (error) {
                console.log('error', error)
                reject(error);
                return;
            }

            resolve(result);
        }));

// TODO Should be moved to helpers?
export const createContainer = () => new Promise((resolve, reject) =>
    blobService.createContainerIfNotExists(tableName, (error, result, response) => {
        if (error) {
            // Container exists and is private
            console.log('error', error)
            reject(error);
            return;
        }

        resolve(result);
    }));

// TODO set up default function to handle
// TODO wrap functions so pre processing can be done such as Blob and Table creation
// export default {
//     getProjectList,
// };
