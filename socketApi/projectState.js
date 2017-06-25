import { createSnaphot } from '../projects';

export default ({ socket, action }) => {
  const { payload = {} } = action;
  const { studyUID } = payload;

  console.log('saving snapshot', studyUID);

  createSnaphot({ studyUID, payload });
}