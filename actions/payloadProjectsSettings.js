import { PROJECTS_SET_SETTINGS } from "../constants/actionTypes";

export default (settings = {}) => ({
  type: PROJECTS_SET_SETTINGS,
  settings
});
