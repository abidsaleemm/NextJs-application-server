import {
  queryStudies
} from '../dicom';

import {
  queryProject,
  createSnaphot,
  createProject,
} from '../projects';

export const studies = ({ socket, action }) => { // TODO Change to queryStudies
  queryStudies().then(studies => {
    console.log('dicomStudies', studies);

    // TODO Check if project created
    socket.emit('action', {
      studies,
      type: 'STUDIES',
    });
  }, reason => console.log(reason));
};

export const projectState = ({ socket, action }) => {
  const { payload = {} } = action;
  const { studyUID } = payload;

  console.log('saving snapshot', studyUID);

  createSnaphot({ studyUID, payload });
  // dispatch(projectUpdate(payload));
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

    // console.log('payload', project);

    const dicomSeries = [];

    console.log('dicomSeries', dicomSeries);

    socket.emit('action', {
      type: 'PROJECT_PAYLOAD',
      project: {
        ...project,
        dicomSeries,
      },
    });

    // selectedSeries = selectedSeries === '' ?
  //   firstSeries : selectedSeries;

    // if (values === undefined) {
    // }

    // createProject

  });

  // // get Project
  // if (projectGet(projects)(studyUID) === undefined) {
  //   console.log('Creating project', studyUID);
  //   dispatch(projectAdd(studyUID));
  // }

  // const project = projectGet(getState().projects)(studyUID);

  // let { selectedSeries = '' } = project;
  // const selectedDicomSeries = dicomSeries
  //   .filter(v => v.studyUID === studyUID);

  // const { 0: { seriesUID: firstSeries = '' } = {} } = selectedDicomSeries;

  // selectedSeries = selectedSeries === '' ?
  //   firstSeries : selectedSeries;

  // console.log('selectedSeries', selectedSeries)

  // const volumePromise =
  //   dicomVolume(dicomImages, studyUID, selectedSeries);

  // volumePromise.then(volume => {
  //   console.log('Sending volume payload');
  //   socket.emit('action', {
  //     type: 'VOLUME_SET',
  //     volume,
  //   });
  // });

  // // This will merge object on client
  // socket.emit('action', {
  //   type: 'PROJECT_PAYLOAD',
  //   project: {
  //     ...project,
  //     dicomSeries: dicomSeries
  //       .filter(v => v.studyUID === studyUID),
  //   },
  // });
}