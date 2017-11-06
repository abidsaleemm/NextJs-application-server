import fetchAction from "./fetchAction";
import { PROJECTDETAIL_SET_STATUS } from "../constants/actionTypes";

export default ({ studyUID, status }) => dispatch => {
  dispatch(fetchAction(true));
  dispatch({
    type: "server/setProjectProps",
    studyUID,
    status
  });
};
