// import {
//   queryStudies
// } from '../dicom';

import {
  queryProject,
  createSnaphot,
  createProject,
} from '../projects';

export const projectState = ({ socket, action }) => {
  const { payload = {} } = action;
  const { studyUID } = payload;

  console.log('saving snapshot', studyUID);

  createSnaphot({ studyUID, payload });
}

export const selectSeries = ({ socket, action }) => {
  // const { studyUID, seriesUID } = action;
  // // const { dicomImages = [] } = getState();
  // const dicomImages = [];

  // const volumePromise =
  //   dicomVolume(dicomImages, studyUID, seriesUID);

  // volumePromise.then(volume => {
  //   console.log('Sending volume payload');
  //   socket.emit('action', {
  //     type: 'VOLUME_SET',
  //     volume,
  //   });
  // });
}

export const selectStudy = ({ socket, action }) => {
  const { studyUID } = action;

  queryProject({ studyUID }).then(values => {
    console.log('values1', values);

    const project = values === undefined ?
      createProject({ studyUID }) : values;

    const dicomSeries = [];
    console.log('dicomSeries', dicomSeries);

    socket.emit('action', {
      type: 'PROJECT_PAYLOAD',
      project: {
        ...project,
        dicomSeries,
      },
    });
  });
}