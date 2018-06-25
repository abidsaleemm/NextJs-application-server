export default async ({
  instanceUID,
  blobAdapter: { getBlobData }
}) => {
  const imageData = await getBlobData({
    container: `${process.env.CONTAINER_NAME}-cache`, // TODO Don't use Env var here
    blobName: instanceUID,
    blobService
  });

  // TODO Kinda Hacked should use Array methods?
  const pixelData = new Array(imageData.length / 2)
    .fill(0)
    .map((v, i) => imageData[i * 2] + (imageData[i * 2 + 1] << 8))
    .map((v, i) => (v & 0x8000 ? 0 : v)); // TODO If last bit set then clear.  This will have to be done on indexer so it's much cleaner?

  return pixelData;
};
