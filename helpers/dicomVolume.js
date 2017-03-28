import dicomReadFile from './dicomReadFile';

export default (
  dicomImages = [],
  studyUID = '',
  selectedSeries = '',
) => {
  const promises = dicomImages
    .filter(v => v.studyUID === studyUID)
    .filter(v => v.seriesUID === selectedSeries)
    .sort((a, b) => a.imageNumber - b.imageNumber)
    .map(({ directory, file }) => {
      return new Promise((resolve, reject) => {
        dicomReadFile(directory, file, (err, actionData) => {
          resolve(actionData);
        });
      })
    });

  return Promise.all(promises);
}
