// import {
//   queryImages
// } from '../dicom';

export default async ({ socket, action }) => {
  // const { studyUID, seriesUID } = action;
  // // const { dicomImages = [] } = getState();
  // const dicomImages = [];

  // TODO query images
  
  // const images = await queryImages()
  const volumePromise =
    dicomVolume(dicomImages, studyUID, seriesUID);

  volumePromise.then(volume => {
    console.log('Sending volume payload');
    socket.emit('action', {
      type: 'VOLUME_SET',
      volume,
    });
  });
};