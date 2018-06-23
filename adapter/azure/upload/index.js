import azure from "azure-storage";

const containerName = "uploads";

// TODO Should be moved to helpers? Reused other places
const blobService = azure.createBlobService(
  process.env.STORAGE_ACCOUNT,
  process.env.STORAGE_ACCOUNT_KEY
);

// TODO Should be moved to helpers? Reused other places
const createContainerIfNotExists = ({ name }) =>
  new Promise((resolve, reject) =>
    blobService.createContainerIfNotExists(
      name,
      (error, result, response) => {
        if (error) {
          // Container exists and is private
          console.log("error createContainerIfNotExists", error);
          reject(error);
          return;
        }

        resolve(result);
      }
    )
  );

export const list = async ({ studyUID = "" }) => {
  await createContainerIfNotExists({ name: containerName });
  return await new Promise((resolve, reject) => {
    blobService.listBlobsSegmentedWithPrefix(
      containerName,
      studyUID,
      null,
      (error, { entries = [] }) => {
        if (error) {
          console.log("error list", error);
          reject(error);
          return;
        }

        resolve(
          entries.map(({ name = "" }) => name.split("/").pop())
        );
      }
    );
  });
};

export const get = async ({ studyUID, name }) =>
  blobService.createReadStream(
    containerName,
    `${studyUID}/${name}`,
    (error, result) => {
      if (error) {
        console.log("error get", error);
      }
    }
  );

export const put = async ({ studyUID, name, stream }) => {
  await createContainerIfNotExists({ name: containerName });
  return await new Promise((resolve, reject) => {
    const writeStream = blobService.createWriteStreamToBlockBlob(
      containerName,
      `${studyUID}/${name}`,
      (error, result) => {
        if (error) {
          console.log("error put", error);
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.pipe(writeStream);
  });
};

export const del = async ({ studyUID, name }) => {
  await createContainerIfNotExists({ name: containerName });
  await new Promise((resolve, reject) => {
    blobService.deleteBlob(
      containerName,
      `${studyUID}/${name}`,
      (error, result) => {
        if (error) {
          console.log("error del", error);
          return reject(error);
        }

        resolve();
      }
    );
  });
};
