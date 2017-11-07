import uploadPut from "./uploadPut";

export default ({ target, studyUID }) => dispatch => {
  // TODO Handle multiple files?
  const { 0: file } = target.files;
  const name = file.name;

  const reader = new FileReader();
  reader.onload = ({ target: { result } = {} }) =>
    dispatch(uploadPut({ data: result, name, studyUID }));

  reader.readAsDataURL(file);
};
