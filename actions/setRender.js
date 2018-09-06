export default ({ studyUID, template, anonymous, debug }) => ({
  type: "server/setRender",
  studyUID,
  template,
  anonymous,
  debug
});
