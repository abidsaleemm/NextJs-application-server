export default ({ studyUID, defaultStudyUID }) => ({
  type: "server/createProject",
  studyUID,
  defaultStudyUID
});
