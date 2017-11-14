import { TOGGLE_SIDEBAR_SETTINGS, PROJECTDETAIL_SET_SETTINGS } from "../constants/actionTypes";

export const initialState = {
  projects: []
};

export default (state = { sidebarIsOpen: true }, { type, settings }) => {
  const { sidebarIsOpen, ...rest } = state;
  switch (type) {
    case TOGGLE_SIDEBAR_SETTINGS:
      return {
        ...rest,
        sidebarIsOpen: !sidebarIsOpen
      };
    case PROJECTDETAIL_SET_SETTINGS:
      return settings
    default:
      return state;
  }
};
