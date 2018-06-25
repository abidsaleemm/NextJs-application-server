const videoSave = async ({
  studyUID,
  readStream,
  containerName,
  blobAdapter
}) => {
  const { createWriteStreamToBlockBlob } = blobAdapter;

  return await createWriteStreamToBlockBlob({
    containerName,
    blobName: studyUID,
    readStream
  });
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

const videoExists = async ({
  studyUID,
  blobAdapter,
  containerName
}) => {
  const { doesBlobExist } = blobAdapter;

  if (studyUID) {
    return await doesBlobExist({ containerName, blobName: studyUID });
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
