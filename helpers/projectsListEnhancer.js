// TODO Most of this should be handled in adapter or someplace else. WG
export default ({ adapter = {} } = {}) => async ([
  //   { studyName = "", ...study } = {},
  { studyUID, studyName = "", ...study } = {},
  //   { status, notes, ...project } = {},
  project,
  renders
]) => {
  const {
    file: { list: fileList = () => {} } = {},
    projects: { getProject = () => {} } = {}
  } = adapter;

  // TODO Do we need the MultusID at all?
  //   const { multusID = "" } = (await getProject({ studyUID })) || {};

  return {
    ...project,
    ...study,
    studyName:
      // TODO Move to adapter? WG
      studyName.length > 20 ? studyName.substr(0, 20).concat("...") : studyName, // TODO Trim here. Maybe better place or way?
    // studyUID,
    // multusID,
    // status: status,
    // notes: notes,
    uploadedFiles: await fileList({ path: studyUID }), // TODO Should be moved to adapter. WG
    // sample,
    renders
  };
};
