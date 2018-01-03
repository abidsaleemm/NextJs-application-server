import { PORTAL_UPDATE_STUDY } from "../constants/actionTypes";

export default ({ studyUID, props }) => dispatch => {
  dispatch({
    type: "server/setMetaData",
    studyUID,
    props
  });

  dispatch({ type: PORTAL_UPDATE_STUDY, studyUID, props });
};
