import { getProjectSnapshot } from "../projects";
import { getSeries, getImages, getImageData } from "../dicom";
import selectSeries from "./selectSeries";

export default async ({ socket, action }) => {
  const { studyUID } = action;
  console.log("studyUID", studyUID); // TODO Used for debugging / logging

  const project = await getProjectSnapshot({ studyUID });

  if (project === undefined) {
    console.log("Socket API Project not found");
    return; // TODO Handle bailout better? Error handle?
  }

  const dicomSeries = (await getSeries({ studyUID })).filter(
    ({ seriesName }) => seriesName !== undefined
  );
  const { 0: { seriesUID: firstSeriesUID } = [] } = dicomSeries;

  const { selectedSeries: projectSelectedSeries } = project;

  const selectedSeries = dicomSeries.some(
    ({ seriesUID }) => seriesUID === projectSelectedSeries
  )
    ? projectSelectedSeries
    : firstSeriesUID;

  await socket.emit("action", {
    type: "PROJECT_PAYLOAD",
    project: {
      ...project,
      selectedSeries,
      dicomSeries,
      studyUID,
    }
  });

  const { slice: { location = 0 } = {} } = project;

  if (dicomSeries.length > 0) {
    await selectSeries({
      socket,
      action: { seriesUID: selectedSeries, location }
    });
  }
};
