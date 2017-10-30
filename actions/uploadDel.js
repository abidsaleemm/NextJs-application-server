export default ({ name, studyUID = "" }) => dispatch => {
  dispatch({ type: "server/uploadDel", name, studyUID });
};
