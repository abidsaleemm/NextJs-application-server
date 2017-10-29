export default ({ data, name, studyUID = ''}) => dispatch => {
  dispatch({ type: 'server/uploadPut', data, name, studyUID });
};