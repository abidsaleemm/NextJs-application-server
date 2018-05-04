export default ({ studyUID }) => {
  return { type: "server/videoDelete", studyUID };
};
