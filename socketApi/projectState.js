import { createSnapshot } from '../projects';

export default async ({ socket, action }) => {
  const { payload = {} } = action;
  const { studyUID } = payload;

  console.log('saving snapshot', studyUID);

  createSnapshot({ studyUID, payload });
}