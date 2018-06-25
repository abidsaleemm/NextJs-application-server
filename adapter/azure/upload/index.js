// import azure from "azure-storage";

// const containerName = "uploads";

// TODO Should be moved to helpers? Reused other places
// const blobService = azure.createBlobService(
//   process.env.STORAGE_ACCOUNT,
//   process.env.STORAGE_ACCOUNT_KEY
// );

// TODO Should be moved to helpers? Reused other places
// const createContainerIfNotExists = ({ name }) =>
//   new Promise((resolve, reject) =>
//     blobService.createContainerIfNotExists(
//       name,
//       (error, result, response) => {
//         if (error) {
//           // Container exists and is private
//           console.log("error createContainerIfNotExists", error);
//           reject(error);
//           return;
//         }

//         resolve(result);
//       }
//     )
//   );

// import { createContainerIfNotExists } from "../blob";

const list = async ({
  studyUID = "",
  blobAdapter: { listBlobsSegmentedWithPrefix }
}) => {
  //   await createContainerIfNotExists({ name: containerName });

  return await listBlobsSegmentedWithPrefix({
    containerName,
    prefix: studyUID
  });
  //listBlobsSegmentedWithPrefix
  //   return await new Promise((resolve, reject) => {
  //     blobService.listBlobsSegmentedWithPrefix(
  //       containerName,
  //       studyUID,
  //       null,
  //       (error, { entries = [] }) => {
  //         if (error) {
  //           console.log("error list", error);
  //           reject(error);
  //           return;
  //         }

  //         resolve(
  //           entries.map(({ name = "" }) => name.split("/").pop())
  //         );
  //       }
  //     );
  //   });
};

const get = async ({
  studyUID,
  containerName,
  name,
  blobAdapter: { createReadStream }
}) => {
  return await createReadStream({
    containerName,
    blobName: `${studyUID}/${name}`
  });
};

//   blobService.createReadStream(
//     containerName,
//     `${studyUID}/${name}`,
//     (error, result) => {
//       if (error) {
//         console.log("error get", error);
//       }
//     }
//   );

const put = async ({
  studyUID,
  name,
  stream,
  containerName,
  blobAdapter: { createWriteStreamToBlockBlob }
}) => {
  //   await createContainerIfNotExists({ name: containerName });

  return await createWriteStreamToBlockBlob({
    containerName,
    blobName: `${studyUID}/${name}`
  });
};

//   return await new Promise((resolve, reject) => {
//     const writeStream = blobService.createWriteStreamToBlockBlob(
//       containerName,
//       `${studyUID}/${name}`,
//       (error, result) => {
//         if (error) {
//           console.log("error put", error);
//           return reject(error);
//         }

//         resolve(result);
//       }
//     );

//     stream.pipe(writeStream);
//   });
// };

const del = async ({
  studyUID,
  name,
  containerName,
  blobAdapter: { deleteBlob }
}) => {
  //   await createContainerIfNotExists({ name: containerName });

  return await deleteBlob({
    containerName,
    blobName: `${studyUID}/${name}`
  });
};

//   await new Promise((resolve, reject) => {
//     blobService.deleteBlob(
//       containerName,
//       `${studyUID}/${name}`,
//       (error, result) => {
//         if (error) {
//           console.log("error del", error);
//           return reject(error);
//         }

//         resolve();
//       }
//     );
//   });
// };

export default ({ blobAdapter }) => {
  const containerName = "uploads";

  // TODO Wrap this with Promise
  //   createContainerIfNotExists({
  //     tableName: containerName,
  //     blobService
  //   });

  return {
    get: async props =>
      await get({ ...props, blobAdapter, containerName }),
    put: async props =>
      await put({ ...props, blobAdapter, containerName }),
    del: async props =>
      await del({ ...props, blobAdapter, containerName }),
    list: async props =>
      await list({ ...props, blobAdapter, containerName })
  };
};
