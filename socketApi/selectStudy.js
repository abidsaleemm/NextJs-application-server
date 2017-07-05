import { getProjectSnapshot } from '../projects';
import { getSeries, getImages } from '../dicom';

export default async ({ socket, action }) => {
  const { studyUID } = action;
  console.log('studyUID', studyUID); // TODO Used for debugging / logging

  const project = await getProjectSnapshot({ studyUID })

  if (project === undefined) {
    console.log('Socket API Project not found');
    return; // TODO Handle bailout better? Error handle?
  }

  const dicomSeries = await getSeries({ studyUID });

  socket.emit('action', {
    type: 'PROJECT_PAYLOAD',
    project: {
      ...project,
      dicomSeries,
    },
  });

  if (dicomSeries.length > 0) {
    const { 0: { seriesUID: firstSeriesUID } } = dicomSeries;
    const { seriesUID = firstSeriesUID } = project;
    const volume = await getImages({ seriesUID });

    socket.emit('action', {
      type: 'VOLUME_SET',
      volume,
    });
  }
}