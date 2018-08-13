import { PROJECTS_SET_SETTINGS } from "../constants/actionTypes";

export default (settings = {}) => (dispatch, getState) => {
  const {
    projectsSettings: { sortDesc = false, sortKey } = {}
  } = getState();

  dispatch({
    type: PROJECTS_SET_SETTINGS,
    settings: {
      ...settings,
      sortDesc: settings.sortKey !== undefined ? !sortDesc : sortDesc
    }
  });
};
