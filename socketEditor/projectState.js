import { setProjectSnapshot } from '../projects';

export default async ({ socket, action }) => {
  const { payload = {} } = action;
  const { studyUID } = payload;

  console.log('saving snapshot', studyUID);

  setProjectSnapshot({ studyUID, payload });
}