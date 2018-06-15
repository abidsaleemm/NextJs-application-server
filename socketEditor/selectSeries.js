import { getImages, getImageData } from "../dicom";
// import asyncForEach from "../helpers/asyncForEach";
import PromisePool from "es6-promise-pool";

export default async ({
  socket,
  action: { seriesUID, sliceLocation = 0, loadImages = true } = {}
}) => {
  const imageList = await getImages({
    seriesUID
  });

  // TODO If slice index then load first
  await new Promise((resolve, reject) => {
    socket.emit(
      "action",
      {
        type: "VOLUME_SET",
        volume: imageList
      },
      err => (err ? reject() : resolve())
    );
  });

  // Send selected image first
  const { [sliceLocation]: { instanceUID } = {} } = imageList;

  if (!loadImages) {
    // Bailout
    socket.emit("action", { type: "SPINNER_TOGGLE", toggle: false });
    socket.emit("action", { type: "VOLUME_LOADED" });
    return;
  }

  if (instanceUID) {
    const data = await getImageData({ instanceUID });

    await new Promise((resolve, reject) => {
      socket.emit(
        "action",
        {
          type: "VOLUME_SLICE_DATA",
          index: sliceLocation,
          data
        },
        err => (err ? reject() : resolve())
      );
    });
  }

  socket.emit("action", {
    type: "SPINNER_TOGGLE",
    toggle: false
  });

  const concurrency = 3;
  const imageListEnhanced = imageList
    .map((v, i) => ({
      ...v,
      index: i
    }))
    .filter(({ index }) => index !== sliceLocation);

  // TODO Sort images from sliceLocation outward
  const pool = new PromisePool(() => {
    if (imageListEnhanced.length <= 0) {
      return null;
    }

    const { instanceUID, index } = imageListEnhanced.pop();
    return new Promise(async (resolve, reject) => {
      const data = await getImageData({ instanceUID });

      socket.emit(
        "action",
        {
          type: "VOLUME_SLICE_DATA",
          index,
          data
        },
        err => (err ? reject() : resolve())
      );
    });
  }, concurrency);

  const poolPromise = pool.start();

  // Wait for the pool to settle.
  poolPromise.then(
    () => {
      console.log("All images loaded");
      socket.emit("action", { type: "VOLUME_LOADED" });
    },
    ({ message }) => {
      console.log(`Error ${message}`);
    }
  );
};
