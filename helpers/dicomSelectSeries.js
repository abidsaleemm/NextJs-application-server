import dicomVolume from './dicomVolume';

export default (dicomImages, studyUID, seriesUID) => {
  const volumePromise =
    dicomVolume(dicomImages, studyUID, selectedSeries);

  volumePromise.then(volume => {
    console.log('Sending volume payload');
    socket.emit('action', {
      type: 'VOLUME_SET',
      volume,
    });
  });
}
