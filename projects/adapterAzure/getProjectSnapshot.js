import azure from "azure-storage";
import { blobService, tableName, createContainer } from './';

export default async ({ studyUID = '' }) => {
    await createContainer();

    const json = await (new Promise((resolve, reject) => 
        blobService.getBlobToText(tableName, studyUID, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result)
        })));

    // TODO Catch exceptions for JSON.parse
    return JSON.parse(json);
};
