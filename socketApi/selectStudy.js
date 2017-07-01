import {
  queryProjectSnapshot,
  createSnapshot, // TODO should we create an initial snapshot?
  createProject,
} from '../projects';

import { querySeries } from '../dicom';

export default async ({ socket, action }) => {
  const { studyUID } = action;
  console.log('studyUID', studyUID);

  let project = await queryProjectSnapshot({ studyUID })

  // console.log('project', project);
  // TODO This is reusable seperate
  if (project === undefined) {
    console.log('Socket API Project not found');
    // project = createProject({ studyUID });
    // createSnapshot({ studyUID, payload: project })
    return;
  }

  // const dicomSeries = [];
  const dicomSeries = await querySeries({ studyUID });
  console.log('dicomSeries', dicomSeries);

  socket.emit('action', {
    type: 'PROJECT_PAYLOAD',
    project: {
      ...project,
      dicomSeries,
    },
  });
}