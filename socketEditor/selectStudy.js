import { Vector3 } from "three";
import selectSeries from "./selectSeries";

import { adapter } from "../server";

export default async ({ socket, action }) => {
  const {
    projects: { getProjectSnapshot = () => {}, getProject = () => {} } = {},
    dicom: {
      getSeries = () => {},
      getStudy = () => {},
      getImages = () => {}
    } = {}
  } = adapter;
  const { studyUID, loadImages } = action;

  console.log("studyUID", studyUID); // TODO Used for debugging / logging

  if (!studyUID) {
    return; // TODO Handle bailout better? Error handle?
  }

  const [
    { seriesFilter = {} } = {},
    project,
    { studyType } = {}
  ] = await Promise.all([
    getProject({ studyUID }),
    getProjectSnapshot({ studyUID }),
    getStudy({ studyUID })
  ]);

  if (project === undefined) {
    console.log("Socket API Project not found");
    return; // TODO Handle bailout better? Error handle?
  }

  const dicomSeries = await Promise.all(
    (await getSeries({ studyUID }))
      .filter(
        ({ seriesName }) => seriesName !== undefined && seriesName !== null
      )
      .map(async v => {
        const { seriesUID } = v;
        const { [seriesUID]: seriesFilterValue } = seriesFilter;

        const images = await getImages({
          seriesUID
        });

        const imagesFiltered = images.filter(
          ({ imageOrientation }) => imageOrientation
        );

        // TODO Grabbing middle image? probably a cleanner way. WG
        const {
          [parseInt(imagesFiltered.length / 2)]: {
            imageOrientation: [oX, oY] = [
              { x: 0, y: 0, z: 0 },
              { x: 0, y: 0, z: 0 }
            ]
          } = {}
        } = imagesFiltered;
        const direction = new Vector3().crossVectors(oX, oY);

        return { ...v, seriesFilter: seriesFilterValue, direction };
      })
  );

  const { 0: { seriesUID: firstSeriesUID } = [] } = dicomSeries;

  const { selectedSeries: projectSelectedSeries } = project;

  const selectedSeries = dicomSeries.some(
    ({ seriesUID }) => seriesUID === projectSelectedSeries
  )
    ? projectSelectedSeries
    : firstSeriesUID;

  //   const { studyType } = (await getStudy({ studyUID })) || {};

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
          studyUID,
          studyType
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
