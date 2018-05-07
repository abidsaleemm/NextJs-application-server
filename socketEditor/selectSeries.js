import { getImages, getImageData } from "../dicom";

export default async ({
  socket,
  action: { seriesUID, location = 0 } = {},
  sliceIndex = 0
}) => {
  const imageList = await getImages({
    seriesUID
  });

  // TODO If slice index then load first
  await socket.emit("action", {
    type: "VOLUME_SET",
    volume: imageList
  });

  // Send selected image first
  const { [location]: { instanceUID } = {} } = imageList;

  if (instanceUID) {
    const data = await getImageData({ instanceUID });

    socket.emit("action", {
      type: "VOLUME_SLICE_DATA",
      index: location,
      data
    });
  }

  socket.emit("action", { type: "SPINNER_TOGGLE", toggle: false });

  // Push slice Data in background
  imageList.map(async ({ instanceUID }, i) => {
    if (i === location) {
      return;
    }

    const data = await getImageData({ instanceUID });

    socket.emit("action", {
      type: "VOLUME_SLICE_DATA",
      index: i,
      data
    });
  });
};
