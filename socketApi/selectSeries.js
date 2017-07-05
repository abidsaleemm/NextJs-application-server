import { getImages } from '../dicom';

export default async ({ socket, action }) => {
  const { studyUID, seriesUID } = action;
  const volume = await getImages({ seriesUID });

  socket.emit('action', {
    type: 'VOLUME_SET',
    volume,
  });
};