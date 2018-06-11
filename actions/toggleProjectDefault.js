import setProjectProps from "./setProjectProps";

export default studyUID => (dispatch, getState) => {
  const { projects: { projects = [] } = {} } = getState();

  const foundProject = projects.find(v => v.studyUID === studyUID);

  if (foundProject) {
    const { sample = false } = foundProject;

    dispatch(setProjectProps({ studyUID, sample: !sample }));
  }
};
