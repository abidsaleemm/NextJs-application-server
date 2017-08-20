import { getProjectSnapshot } from "../projects";
import { getSeries, getImages } from "../dicom";

export default async ({ socket, action }) => {
  const { studyUID } = action;
  console.log("studyUID", studyUID); // TODO Used for debugging / logging

  const project = await getProjectSnapshot({ studyUID });

  if (project === undefined) {
    console.log("Socket API Project not found");
    return; // TODO Handle bailout better? Error handle?
  }

  const dicomSeries = await getSeries({ studyUID });
  const { 0: { seriesUID: firstSeriesUID } = [] } = dicomSeries;

  await socket.emit(
    "action",
    {
      type: "PROJECT_PAYLOAD",
      project: {
        selectedSeries: firstSeriesUID,
        ...project,
        dicomSeries
      }
    }
  );

  if (dicomSeries.length > 0) {
    const { seriesUID = firstSeriesUID } = project;
    const volume = await getImages({ seriesUID });

    socket.emit("action", {
      type: "VOLUME_SET",
      volume
    });
  }
};
