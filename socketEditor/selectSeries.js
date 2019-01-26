import PromisePool from "es6-promise-pool";
import compressjs from "compressjs";
import { partition, splitEvery } from "ramda";

export default async ({
  socket,
  action: { seriesUID, sliceLocation = 0, loadImages = true } = {},
  adapter
}) => {
  const {
    dicom: { getImages = () => {}, getImageData = () => {} } = {}
  } = adapter;

  const imageList = await getImages({
    seriesUID
  });

  // Send selected image first
  const { [sliceLocation]: { instanceUID } = {} } = imageList;

  await new Promise(async (resolve, reject) => {
    socket.emit(
      "action",
      {
        type: "VOLUME_SET",
        seriesUID,
        volume: await Promise.all(
          imageList.map(async (v, i) => {
            // pre-cache selected image
            return sliceLocation === i
              ? {
                  ...v,
                  pixelData: await getImageData({
                    instanceUID,
                    compressed: true
                  })
                }
              : v;
          })
        )
      },
      () => resolve()
    );
  });

  if (!loadImages) {
    // Bailout
    socket.emit("action", { type: "SPINNER_TOGGLE", toggle: false });
    socket.emit("action", { type: "VOLUME_LOADED" });
    return;
  }

  socket.emit("action", {
    type: "SPINNER_TOGGLE",
    toggle: false
  });

  const concurrency = 2;

  // Sort background loading from selected image.
  const [low = [], high = []] = partition(({ index }) => index < sliceLocation)(
    imageList
      .map((v, i) => ({
        ...v,
        index: i // Save orginal index
      }))
      .filter(({ index }) => index !== sliceLocation) // Don't reload pre-cached image
  );

  const { list: imageListSorted = [] } = imageList.reduce(
    ({ list = [], low: [l, ...low] = [], high: [h, ...high] = [] }) => {
      return {
        list: [...list, ...(l ? [l] : []), ...(h ? [h] : [])],
        low,
        high
      };
    },
    {
      list: [],
      low: low.sort(({ index: a }, { index: b }) => b - a),
      high
    }
  );

  const imageListEnhanced = splitEvery(2, imageListSorted);

  // TODO Sort images from sliceLocation outward
  const pool = new PromisePool(() => {
    if (imageListEnhanced.length <= 0) {
      return null;
    }

    // TODO this should be ann array?
    // const { instanceUID, index } = imageListEnhanced.shift();
    const list = imageListEnhanced.shift();

    return new Promise(async (resolve, reject) => {
      const slices = (await Promise.all(
        list.map(async ({ instanceUID, index }) => {
          const data = await getImageData({ instanceUID, compressed: true });
          return { index, data };
        }, {})
      )).reduce((a, { index, data }) => ({ ...a, [index]: data }), {});

      socket.emit(
        "action",
        {
          type: "VOLUME_SLICE_DATA",
          slices
        },
        ({ selectedSeries }) => {
          if (selectedSeries !== seriesUID) {
            reject({ message: "Series switched during load killing loading." });
          }

          resolve();
        }
      );
    });
  }, concurrency);

  const poolPromise = pool.start();

  // Wait for the pool to settle.
  poolPromise.then(
    () => {
      console.log("All images loaded");
      socket.emit("action", { type: "VOLUME_LOADED", seriesUID });
    },
    ({ message }) => {
      console.log(`Error ${message}`);
    }
  );
};
