import {
  TOGGLE_SIDEBAR_SETTINGS,
  PROJECTDETAIL_SET_SETTINGS
} from "../constants/actionTypes";

export const initialState = {
  sidebarIsOpen: false,
  projectsListSortKey: "",
  projectsListSortDesc: false
};

export default (
  state = { sidebarIsOpen: true },
  { type, settings = {} }
) => {
  // TODO This sucks maybe deconstuct above will be better?
  const { projectsListSortKey } = settings;
  const { sidebarIsOpen, ...rest } = state;

  switch (type) {
    case TOGGLE_SIDEBAR_SETTINGS:
      return {
        ...rest,
        sidebarIsOpen: !sidebarIsOpen
      };
    case PROJECTDETAIL_SET_SETTINGS:
      return {
        ...state,
        ...settings,
        // TODO Messy same in other reducer projectsSettings
        projectsListSortKey:
          projectsListSortKey !== undefined
            ? projectsListSortKey
            : state.projectsListSortKey,
        projectsListSortDesc:
          projectsListSortKey !== undefined
            ? state.projectsListSortKey === projectsListSortKey
              ? !state.projectsListSortDesc
              : state.projectsListSortDesc
            : state.projectsListSortDesc
      };
    default:
      return state;
  }
};
