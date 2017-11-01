import { getImages, getImageData } from "../dicom";

export default async ({ socket, action: { seriesUID } = {} }) => {
  const imageList = await getImages({
    seriesUID
  });

  const volume = await Promise.all(
    imageList.map(
      async ({ instanceUID }, i) =>
        await getImageData({ instanceUID })
    )
  );

  await socket.emit("action", {
    type: "VOLUME_SET",
    volume
  });

  socket.emit("action", { type: "SPINNER_TOGGLE", toggle: false });
};
