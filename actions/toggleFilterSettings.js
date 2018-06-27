import setProjectsSettings from "./setProjectsSettings";

export default (key = "") => (dispatch, getState) => {
  const {
    projectsSettings: { filter, filter: { [key]: value } = {} } = {}
  } = getState();

  // TODO Check type?
  if (value !== undefined) {
    dispatch(
      setProjectsSettings({ filter: { ...filter, [key]: !value } })
    );
  }
};
