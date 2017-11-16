export default ({ studyUID, defaultName }) => ({
  type: "server/createProject",
  studyUID,
  defaultName
});
