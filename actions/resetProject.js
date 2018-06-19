export default ({ studyUID }) => dispatch => ({
  type: "server/resetProject",
  studyUID
});
