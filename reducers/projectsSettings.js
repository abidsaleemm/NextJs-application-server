import { PROJECTS_SET_SETTINGS } from "../constants/actionTypes";

const initialState = {
  //
  filter: {},
  sortKey: "status",
  sortDesc: false,
  //
  projectsListSortKey: "status",
  projectsListSortDesc: false
};

export default (state = initialState, { type, settings = {} }) => {
  const { filter, sortKey, projectsListSortKey, sortDesc } = settings;

  switch (type) {
    // TODO This is used in two places.  Should a utility/helper function?
    case PROJECTS_SET_SETTINGS:
      return {
        ...state,
        ...settings,
        sortKey: sortKey !== undefined ? sortKey : state.sortKey,
        sortDesc: sortDesc !== undefined ? sortDesc : state.sortDesc,
        filter: {
          ...state.filter,
          ...filter
        },
        projectsListSortKey: projectsListSortKey !== undefined ? projectsListSortKey : state.projectsListSortKey,
        projectsListSortDesc:
          projectsListSortKey !== undefined // TODO Handle this in action?
            ? state.projectsListSortKey === projectsListSortKey
              ? !state.projectsListSortDesc
              : state.projectsListSortDesc
            : state.projectsListSortDesc
      };
    default:
      return state;
  }
};
