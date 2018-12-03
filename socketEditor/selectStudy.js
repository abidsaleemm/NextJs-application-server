import selectSeries from "./selectSeries";

export default async ({ socket, action, adapter }) => {
  const {
    projects: { getProjectSnapshot = () => {}, getProject = () => {} } = {},
    dicom: { getSeries = () => {}, getStudy = () => {} } = {}
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

  const dicomSeries = (await getSeries({ studyUID }))
    .filter(({ seriesName }) => seriesName !== undefined && seriesName !== null)
    .map(v => {
      const { seriesUID } = v;
      const { [seriesUID]: seriesFilterValue } = seriesFilter;

      return { ...v, seriesFilter: seriesFilterValue };
    });

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
      action: { seriesUID: selectedSeries, sliceLocation, loadImages },
      adapter
    });
  }
};
