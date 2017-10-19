import { PORTAL_SET_FILTER, PORTAL_SET_SORT } from "../constants/actionTypes";

export const initialState = {
  filter: {
    status: "", // TODO Change type later
    patientName: "",
    studyName: "",
    studyDate: "", // TODO Change type later
    modality: "",
    location: "",
    client: ""
  },
  sortKey: "status",
  sortDesc: false,
};

export default (state = initialState, { type, filter = {}, sort = {} }) => {
  switch (type) {
    // TODO This is used in two places.  Should a utility function be created and used to handle the merge?
    case PORTAL_SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...filter
        }
      };
    // issue-34 This is reusable cut this reducer up
    case PORTAL_SET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          ...sort,
          desc: state.sort.id === sort.id ? !state.sort.desc : state.sort.desc
        }
      };
    default:
      return state;
  }
};
