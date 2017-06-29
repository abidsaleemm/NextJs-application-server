import azure from "azure-storage";
import { blobService } from './';

export default async () => {

};

// export default (studyUID = null, data = {}, callback = () => {}) => {
//       lookupLast(tableName, studyUID, (error, { index: { '_': index = 0 } = {}, '.metadata': { etag } = {} } = {}, response) => {
//         insertSnapshotID(tableName, index + 1, studyUID, data, etag,  (error) => {
//           console.log('Snapshot saved', error);
//         });
//       });
//     },