export default ({ target, studyUID }) => dispatch => {
  const { 0: file } = target.files; // Only handle as a single file
  const name = file.name;

  const reader = new FileReader();
  reader.onload = ({ target: { result: data } = {} }) =>
    dispatch({
      type: "server/uploadPut",
      data,
      name,
      studyUID
    });

  reader.readAsDataURL(file);
};
