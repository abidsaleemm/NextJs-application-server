import { getImages } from '../dicom';

export default async ({ socket, action }) => {
  const { studyUID, seriesUID } = action;
  const volume = await getImages({ seriesUID });

  await socket.emit('action', {
    type: 'VOLUME_SET',
    volume,
  });

  socket.emit('action', { type: 'SPINNER_TOGGLE', toggle: false });
};