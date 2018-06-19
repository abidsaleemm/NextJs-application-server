export default ({ studyUID }) => dispatch => {
  dispatch({ type: "server/destroyProject", studyUID });
};
