import setProjectsSettings from "./setProjectsSettings";

export default (key = "") => (dispatch, getState) => {
  const {
    projectsSettings: {
      filter,
      filter: { [key]: value = false } = {}
    } = {}
  } = getState();

  dispatch(
    setProjectsSettings({ filter: { ...filter, [key]: !value } })
  );
};
