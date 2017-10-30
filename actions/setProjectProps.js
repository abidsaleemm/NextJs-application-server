import fetchApi from "../helpers/fetchApi";
import { PROJECTDETAIL_SET_STATUS } from "../constants/actionTypes";

export default ({ studyUID, status }) => dispatch => {
  dispatch({ type: 'server/setProjectProps', studyUID, status });
};
