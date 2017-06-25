import {
  queryProject,
  createSnaphot, // TODO should we create an initial snapshot?
  createProject,
} from '../projects';

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