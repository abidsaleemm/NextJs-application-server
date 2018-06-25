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

// import { createContainerIfNotExists } from "../blob";

const videoSave = async ({
  studyUID,
  readStream,
  //   blobService,
  containerName,
  blobAdapter
}) => {
  const { createWriteStreamToBlockBlob } = blobAdapter;

  return await createWriteStreamToBlockBlob({
    containerName,
    blobName: studyUID,
    readStream
  });

  //   await createContainer(); // Create if container does not exists
  //   return new Promise((resolve, reject) => {
  //     const writeStream = blobService.createWriteStreamToBlockBlob(
  //       containerName,
  //       studyUID,
  //       (err, result) => {
  //         if (err) {
  //           return reject(err);
  //         }

  //         console.log("Video blob uploaded.", studyUID);
  //         resolve(result);
  //       }
  //     );

  //     readStream.pipe(writeStream);
  //   });
};

// Returns readStream
const videoLoad = async ({
  studyUID,
  blobAdapter,
  containerName
}) => {
  const { createReadStream } = blobAdapter;

  return await createReadStream({
    containerName,
    blobName: studyUID
  });
};

// blobService.createReadStream(
//   containerName,
//   studyUID,
//   (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     console.log(
//       `Video blob loaded ${result.contentLength} bytes.`,
//       studyUID
//     );
//   }
// );

const videoExists = async ({
  studyUID,
  blobAdapter,
  containerName
}) => {
  const { doesBlobExist } = blobAdapter;

  if (studyUID) {
    return await doesBlobExist({ containerName, blobName: studyUID });
    // return new Promise((resolve, reject) =>
    //   blobService.doesBlobExist(
    //     containerName,
    //     studyUID,
    //     (err, { exists }) => {
    //       if (err) {
    //         return reject(err);
    //       }

    //       resolve(exists);
    //     }
    //   )
    // );
  }
};

const videoDelete = async ({
  studyUID,
  blobAdapter,
  containerName
}) => {
  const { deleteBlobIfExists } = blobAdapter;

  return await deleteBlobIfExists({
    containerName,
    blobName: studyUID
  });
};
// new Promise((resolve, reject) =>
//   blobService.deleteBlobIfExists(containerName, studyUID, err => {
//     if (err) {
//       return reject(err);
//     } else {
//       return resolve();
//     }
//   })
// );

export default ({ blobAdapter }) => {
  const { createContainerIfNotExists = () => {} } = blobAdapter;

  const containerName = "videos";
  createContainerIfNotExists({ containerName });

  return {
    videoSave: async props =>
      await videoSave({ ...props, blobAdapter, containerName }),
    videoLoad: async props =>
      await videoLoad({ ...props, blobAdapter, containerName }),
    videoExists: async props =>
      await videoExists({ ...props, blobAdapter, containerName }),
    videoDelete: async props =>
      await videoDelete({ ...props, blobAdapter, containerName })
  };
};
