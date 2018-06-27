import azure from "azure-storage";

import createBlobSnapshot from "./createBlobSnapshot";
import createBlockBlobFromText from "./createBlockBlobFromText";
import createContainerIfNotExists from "./createContainerIfNotExists";
import deleteBlob from "./deleteBlob";
import deleteBlobIfExists from "./deleteBlobIfExists";
import getBlobProperties from "./getBlobProperties";
import getBlobToText from "./getBlobToText";
import getBlobData from "./getBlobData";
import createWriteStreamToBlockBlob from "./createWriteStreamToBlockBlob";
import createReadStream from "./createReadStream";
import doesBlobExist from "./doesBlobExist";
import listBlobsSegmentedWithPrefix from "./listBlobsSegmentedWithPrefix";

export default () => {
  const blobService = azure.createBlobService(
    process.env.STORAGE_ACCOUNT,
    process.env.STORAGE_ACCOUNT_KEY
  );

  return {
    createBlobSnapshot: async props =>
      await createBlobSnapshot({ ...props, blobService }),
    createBlockBlobFromText: async props =>
      await createBlockBlobFromText({ ...props, blobService }),
    createContainerIfNotExists: async props =>
      await createContainerIfNotExists({ ...props, blobService }),
    deleteBlob: async props =>
      await deleteBlob({ ...props, blobService }),
    deleteBlobIfExists: async props =>
      await deleteBlobIfExists({ ...props, blobService }),
    getBlobProperties: async props =>
      await getBlobProperties({ ...props, blobService }),
    getBlobToText: async props =>
      await getBlobToText({ ...props, blobService }),
    getBlobData: async props =>
      await getBlobData({ ...props, blobService }),
    createWriteStreamToBlockBlob: async props =>
      await createWriteStreamToBlockBlob({ ...props, blobService }),
    createReadStream: async props =>
      await createReadStream({ ...props, blobService }),
    doesBlobExist: async props =>
      await doesBlobExist({ ...props, blobService }),
    listBlobsSegmentedWithPrefix: async props =>
      await listBlobsSegmentedWithPrefix({ ...props, blobService })
  };
};
