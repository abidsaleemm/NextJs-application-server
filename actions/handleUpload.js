import fetchAction from "./fetchAction";

export default ({ target, studyUID }) => dispatch => {
  const { 0: file } = target.files; // Only handle as a single file
  const name = file.name;

  // TODO Should we do this or handle different way? If upload crash loader will stay running.
  dispatch(fetchAction(true));

  const reader = new FileReader();
  reader.onload = ({ target: { result: data } = {} }) => {
    dispatch({
      type: "server/uploadPut",
      data,
      name,
      studyUID
    });
  };

  reader.readAsDataURL(file);
};
