import fetchAction from "./fetchAction";
import { PROJECTDETAIL_SET_STATUS } from "../constants/actionTypes";

export default ({ studyUID, ...props }) => dispatch => {
  dispatch(fetchAction(true));
  dispatch({
    type: "server/setProjectProps",
    studyUID,
    ...props
  });
};
