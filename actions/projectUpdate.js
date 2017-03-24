import { PROJECT_UPDATE } from '../constants/actionTypes';

export default (payload) => (dispatch) => {
  const { studyUID } = payload;
  console.log('studyUID', studyUID)
  if (studyUID !== undefined) {
    dispatch({ type: PROJECT_UPDATE, studyUID, payload })
  }
};
