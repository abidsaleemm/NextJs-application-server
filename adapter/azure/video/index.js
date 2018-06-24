import azure from "azure-storage";

// TODO Move this under helpers?  Reusable.
export const blobService = azure.createBlobService(
  process.env.STORAGE_ACCOUNT,
  process.env.STORAGE_ACCOUNT_KEY
);

const container = "videos";

// TODO Move this to default azure helpers?
const createContainer = () =>
  new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(
      container,
      (err, result, response) => {
        if (err) {
          return reject(err);
        }

        resolve();
      }
    );
  });

export const videoSave = async ({ studyUID, readStream }) => {
  await createContainer(); // Create if container does not exists
  await new Promise((resolve, reject) => {
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
export const videoLoad = async ({ studyUID }) =>
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

export const videoExists = ({ studyUID }) => {
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

export const videoDelete = ({ studyUID }) =>
  new Promise((resolve, reject) =>
    blobService.deleteBlobIfExists(container, studyUID, err => {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    })
  );