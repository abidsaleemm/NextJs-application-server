import fetchAction from "./fetchAction";

export default ({ studyUID }) => dispatch => {
  dispatch(fetchAction(true));
  dispatch({ type: "server/destroyProject", studyUID });
};
