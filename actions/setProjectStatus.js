import fetchApi from "../helpers/fetchApi";
import { PROJECTDETAIL_SET_STATUS } from '../constants/actionTypes';

export default ({ studyUID, status }) => dispatch => {
  console.log('setting project client');

  fetchApi("setProject", { studyUID, status })
    .then(success => {
      dispatch({ type: PROJECTDETAIL_SET_STATUS, status });
    })
    .catch(error => {
      // TODO Handle this with global wrapper since it's reusable code
    });
};
