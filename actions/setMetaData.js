// import fetchAction from "./fetchAction";

export default ({ studyUID, props }) => ({
  type: "server/setMetaData",
  studyUID,
  props
});
