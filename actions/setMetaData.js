export default ({ studyUID, props }) => ({
  type: "server/setMetaData",
  studyUID,
  props
});
