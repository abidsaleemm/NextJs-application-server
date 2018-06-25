const list = async ({
  studyUID = "",
  containerName,
  blobAdapter: { listBlobsSegmentedWithPrefix }
}) => {
  return await listBlobsSegmentedWithPrefix({
    containerName,
    prefix: studyUID
  });
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

const put = async ({
  studyUID,
  name,
  stream,
  containerName,
  blobAdapter: { createWriteStreamToBlockBlob }
}) => {
  return await createWriteStreamToBlockBlob({
    containerName,
    blobName: `${studyUID}/${name}`,
    readStream: stream
  });
};

const del = async ({
  studyUID,
  name,
  containerName,
  blobAdapter: { deleteBlob }
}) => {
  return await deleteBlob({
    containerName,
    blobName: `${studyUID}/${name}`
  });
};

export default ({ blobAdapter }) => {
  const containerName = "uploads";

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
