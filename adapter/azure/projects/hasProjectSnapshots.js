// import azure from "azure-storage";
// import { blobService, tableName, createContainer } from "./";
import { getBlobProperties } from "../blob";

export default async ({ studyUID = "", tableName, ...props }) => {
  return await getBlobProperties({
    ...props,
    containerName: tableName,
    blobName: studyUID
  });

  //   await createContainer();

  //   return await new Promise((resolve, reject) => {
  //     blobService.getBlobProperties(
  //       tableName,
  //       studyUID,
  //       (error, properties, status) => {
  //         if (error) {
  //           const { statusCode } = error;

  //           if (statusCode === 404) {
  //             resolve(false);
  //             return;
  //           }

  //           reject(error);
  //           return;
  //         }

  //         // issue-18
  //         if (status.isSuccessful) {
  //           resolve(true);
  //         }
  //       }
  //     );
  //   });
};
