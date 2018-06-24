// import azure from "azure-storage";

// TODO Move this under helpers?  Reusable.
// export const blobService = azure.createBlobService(
//   process.env.STORAGE_ACCOUNT,
//   process.env.STORAGE_ACCOUNT_KEY
// );

// const container = "videos";

// TODO Move this to default azure helpers?
// createContainer = () =>
//   new Promise((resolve, reject) => {
//     blobService.createContainerIfNotExists(
//       container,
//       (err, result, response) => {
//         if (err) {
//           return reject(err);
//         }

//         resolve();
//       }
//     );
//   });

import { createContainerIfNotExists } from "../blob";

const videoSave = ({
  studyUID,
  readStream,
  blobService,
  container
}) => {
  //   await createContainer(); // Create if container does not exists
  return new Promise((resolve, reject) => {
    const writeStream = blobService.createWriteStreamToBlockBlob(
      container,
      studyUID,
      (err, result) => {
        if (err) {
          return reject(err);
        }

        console.log("Video blob uploaded.", studyUID);
        resolve(result);
      }
    );

    readStream.pipe(writeStream);
  });
};

// Returns readStream
const videoLoad = async ({ studyUID, blobService, container }) =>
  blobService.createReadStream(container, studyUID, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(
      `Video blob loaded ${result.contentLength} bytes.`,
      studyUID
    );
  });

const videoExists = ({ studyUID, blobService, container }) => {
  if (studyUID) {
    return new Promise((resolve, reject) =>
      blobService.doesBlobExist(
        container,
        studyUID,
        (err, { exists }) => {
          if (err) {
            return reject(err);
          }

          resolve(exists);
        }
      )
    );
  }
};

const videoDelete = ({ studyUID, blobService, container }) =>
  new Promise((resolve, reject) =>
    blobService.deleteBlobIfExists(container, studyUID, err => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    })
  );

export default ({ blobService }) => {
  const container = "videos";
  createContainerIfNotExists({ blobService, tableName: container });

  return {
    videoSave: async props =>
      await videoSave({ ...props, blobService, container }),
    videoLoad: async props =>
      await videoLoad({ ...props, blobService, container }),
    videoExists: async props =>
      await videoExists({ ...props, blobService, container }),
    videoDelete: async props =>
      await videoDelete({ ...props, blobService, container })
  };
};
