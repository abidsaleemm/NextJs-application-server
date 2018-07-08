const list = async ({
  containerName,
  blobAdapter: { listBlobsSegmentedWithPrefix },
  path
}) => {
  return await listBlobsSegmentedWithPrefix({
    containerName,
    prefix: path
  });
};

const get = async ({
  containerName,
  blobAdapter: { createReadStream },
  path
}) => {
  return await createReadStream({
    containerName,
    blobName: path
  });
};

const put = async ({
  stream,
  containerName,
  blobAdapter: { createWriteStreamToBlockBlob },
  path
}) => {
  return await createWriteStreamToBlockBlob({
    containerName,
    blobName: path,
    readStream: stream
  });
};

const del = async ({
  containerName,
  blobAdapter: { deleteBlob },
  path
}) => {
  return await deleteBlob({
    containerName,
    blobName: path
  });
};

// TODO Add exists function?
const exists = async ({ path }) => {};

// TODO Create this.  Not sure if this should be used at all.  Instead use separate service.
const query = async ({}) => {};

export default ({ blobAdapter, containerName = "uploads" }) => {
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
