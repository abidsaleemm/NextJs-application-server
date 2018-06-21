import { SET_PROJECT_PROPS } from "../constants/actionTypes";
import setProjectDetailStatus from "./setProjectDetailStatus";

export default ({ studyUID, ...props }) => dispatch => {
  dispatch({ type: SET_PROJECT_PROPS, studyUID, ...props });

  const { status } = props;

  if (status) {
    dispatch(setProjectDetailStatus(status));
  }

  dispatch({
    type: "server/setProjectProps",
    studyUID,
    ...props
  });
};
