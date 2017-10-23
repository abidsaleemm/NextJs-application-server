import { PORTAL_SET_SETTINGS } from "../constants/actionTypes";

export const initialState = {
  filter: {
    patientName: "",
    client: "",
    patientBirthDate: "",
    patientAddress: "",
  },
  sortKey: "patientName",
  sortDesc: false,
};

export default (
  state = initialState,
  { type, settings: { sortKey, filter = {}, ...settings } = {} }
) => {
  switch (type) {
    // TODO This is used in two places.  Should a utility function?
    case PORTAL_SET_SETTINGS:
      return {
        ...state,
        sortKey: sortKey !== undefined ? sortKey : state.sortKey,
        sortDesc:
          sortKey !== undefined
            ? state.sortKey === sortKey ? !state.sortDesc : state.sortDesc
            : state.sortDesc,
        ...settings,
        // Merge filters if any
        filter: {
          ...state.filter,
          ...filter
        }
      };
    default:
      return state;
  }
};
