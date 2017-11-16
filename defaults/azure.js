import azure from "azure-storage";

const containerName = "defaults";

// TODO This is reusable put this someplace when refactor
const blobService = azure.createBlobService(
  process.env.STORAGE,
  process.env.STORAGE_KEY
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
          return reject(error);
        }

        resolve(result);
      }
    )
  );

export const getDefault = async ({ name }) => {
  await createContainerIfNotExists({ name: containerName });

  return await new Promise((resolve, reject) => {
    blobService.getBlobToText(containerName, name, (error, data) => {
      if (error) {
        console.log("error getDefault", error);
        return reject(error);
      }

      // TODO Add better error handling for this
      const parsedData = JSON.parse(data);
      resolve(parsedData);
    });
  });
};

export const getDefaultList = async () => {
  await createContainerIfNotExists({ name: containerName });

  // TODO Clean up this can be reusable and placed under helpers?
  return await new Promise((resolve, reject) => {
    blobService.listBlobsSegmented(
      containerName,
      null,
      (error, { entries = [] }) => {
        if (error) {
          console.log("error getDefaultList", error);
          return reject(error);
        }

        resolve(entries.map(({ name = "" }) => name));
      }
    );
  });
};
