export default ({ studyUID, anonymous, debug }) => ({
  type: "server/setRender",
  studyUID,
  anonymous,
  debug
});
