import azure from "azure-storage";
import { blobService, tableName, createContainer } from "./";

// export default async ({ studyUID = "" }) => {
//   await createContainer();

//   const json = await new Promise((resolve, reject) =>
//     blobService.getBlobToText(
//       tableName,
//       studyUID,
//       (error, result) => {
//         if (error) {
//           reject(error);
//           return;
//         }

//         resolve(result);
//       }
//     )
//   );

//   // TODO Catch exceptions for JSON.parse
//   return JSON.parse(json);
// };

// import azure from "azure-storage";

// TODO I'm not sure if we even need this now that we are keeping
// track of files that are already processed and indexed

export default async ({ studyUID = "" }) => {
  await createContainer();

  return await new Promise((resolve, reject) => {
    blobService.getBlobProperties(
      tableName,
      studyUID,
      (error, properties, status) => {
        if (error) {
          const { statusCode } = error;

          if (statusCode === 404) {
            resolve(false);
            return;
          }

          reject(error);
          return;
        }

        // issue-18
        if (status.isSuccessful) {
          resolve(true);
        }
      }
    );
  });
};
