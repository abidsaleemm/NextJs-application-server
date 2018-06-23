import { blobService, tableName, createContainer } from "./";
import getProjectSnapshot from "./getProjectSnapshot";
// import { createBlobSnapshot } from "../blob";
import { createBlockBlobFromText } from "../blob";

export default async ({
  studyUID = "_",
  payload = {},
  tableName,
  ...props
}) => {
  //   await createContainer();

  const exists = await getBlobProperties({
    ...props,
    containerName: tableName,
    blobName: studyUID
  });

  // Check if Blob already exists
  //   const exists = await new Promise((resolve, reject) => {
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

  //           reject(error); // TODO Handle error?
  //           return;
  //         }

  //         if (status.isSuccessful) {
  //           resolve(true);
  //         }
  //       }
  //     );
  //   });

  // If An existing payload exists retrieve last and merge with new changes
  let payloadMerged = payload;
  if (exists === true) {
    // If blob already exist create snapshot and write new blob
    // await new Promise((resolve, reject) =>
    //   blobService.createBlobSnapshot(
    //     tableName,
    //     studyUID,
    //     (error, snapshotId) => {
    //       if (error) {
    //         reject(error);
    //         return;
    //       }

    //       resolve();
    //     }
    //   )
    // );

    await blobService({ ...props });

    // Get existing payload and merge
    // TODO There must be a more efficient way to handle this
    const lastSnapshot =
      (await getProjectSnapshot({ studyUID })) || {};

    payloadMerged = {
      ...lastSnapshot,
      ...payloadMerged
    };
  }

  // TODO Catch exceptions for JSON.parse
  const json = JSON.stringify(payloadMerged);

  await createBlockBlobFromText({
    ...props,
    containerName: tableName,
    blobName: studyUID,
    text: json
  });

  //   const metricStartBlob = new Date();

  //   await new Promise((resolve, reject) =>
  //     blobService.createBlockBlobFromText(
  //       tableName,
  //       studyUID,
  //       json,
  //       // { contentType: 'application/json' }, // TODO contentType not working
  //       (error, response) => {
  //         if (error) {
  //           reject();
  //           return;
  //         }

  //         console.log(
  //           `Blob Saved ${studyUID} Duration ${(new Date() -
  //             metricStartBlob) /
  //             1000} sec`
  //         );
  //         resolve();
  //       }
  //     )
  //   );
};
