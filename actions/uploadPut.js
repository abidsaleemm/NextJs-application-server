export default ({ data, name, studyUID = "" }) => ({
  type: "server/uploadPut",
  data,
  name,
  studyUID
});
