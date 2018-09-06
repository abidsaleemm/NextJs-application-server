export default ({ adapter = {} } = {}) => async ([
  { studyUID, studyName = "", ...study } = {},
  { status, notes, sample = false, ...project } = {},
  renders
]) => {
  const {
    file: { list: fileList = () => {} } = {},
    projects: { getProject = () => {} } = {}
  } = adapter;

  // TODO Do we need the MultusID at all?
  const { multusID = "" } = (await getProject({ studyUID })) || {};

  return {
    ...project,
    ...study,
    studyName:
      studyName.length > 20 ? studyName.substr(0, 20).concat("...") : studyName, // TODO Trim here. Maybe better place or way?
    studyUID,
    multusID,
    status: status,
    notes: notes,
    uploadedFiles: await fileList({ path: studyUID }),
    sample,
    renders
  };
};
