export default ({ name, studyUID = "" }) => ({
  type: "server/uploadDel",
  name,
  studyUID
});
