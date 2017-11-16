import fetchAction from "./fetchAction";

export default ({ target, studyUID }) => dispatch => {
  const { 0: file } = target.files; // Only handle as a single file

  dispatch(fetchAction(true));

  const reader = new FileReader();
  reader.onload = ({ target: { result: data } = {} }) => {
    dispatch({
      type: "server/projectImport",
      data,
      studyUID
    });
  };

  // TODO Add better error handling here
  reader.readAsText(file);
};
