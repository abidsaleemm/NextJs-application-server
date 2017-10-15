import { PORTAL_SET_FILTER, PORTAL_SET_SORT } from "../constants/actionTypes";

export const initialState = {
  filter: {
    status: "",
    patientName: "",
    studyName: "",
    modality: "",
    location: "",
    client: ""
  },
  sort: {
    id: "status", // Set default soft id
    desc: false
  }
};

export default (state = initialState, { type, filter = {}, sort = {} }) => {
  switch (type) {
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
