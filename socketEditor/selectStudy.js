import { getProjectSnapshot } from "../projects";
import { getSeries, getImages, getImageData } from "../dicom";
import selectSeries from "./selectSeries";

export default async ({ socket, action }) => {
  const { studyUID, loadImages } = action;
  console.log("studyUID", studyUID); // TODO Used for debugging / logging

  const project = await getProjectSnapshot({ studyUID });

  if (project === undefined) {
    console.log("Socket API Project not found");
    return; // TODO Handle bailout better? Error handle?
  }

  const dicomSeries = (await getSeries({ studyUID })).filter(
    ({ seriesName }) =>
      seriesName !== undefined && seriesName !== null
  );

  const { 0: { seriesUID: firstSeriesUID } = [] } = dicomSeries;

  const { selectedSeries: projectSelectedSeries } = project;

  const selectedSeries = dicomSeries.some(
    ({ seriesUID }) => seriesUID === projectSelectedSeries
  )
    ? projectSelectedSeries
    : firstSeriesUID;

  // Send Payload first
  await new Promise((resolve, reject) => {
    socket.emit(
      "action",
      {
        type: "PROJECT_PAYLOAD",
        project: {
          ...project,
          selectedSeries,
          dicomSeries,
          studyUID
        }
      },
      err => (err ? reject() : resolve())
    );
  });

  const { sliceLocation = 0 } = project;

  if (dicomSeries.length > 0) {
    selectSeries({
      socket,
      action: { seriesUID: selectedSeries, sliceLocation, loadImages }
    });
  }
};
