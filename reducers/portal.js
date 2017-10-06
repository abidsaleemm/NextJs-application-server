import {
  PAYLOAD_PORTAL,
  VIDEO_SET,
  PORTAL_SET_FILTER,
  PORTAL_SET_SORT,
} from "../constants/actionTypes";

export const initialState = {
  projects: [],
  filter: {
    patientName: "",
    studyName: "",
    modality: "",
    location: ""
  },
  sort: {
		id: 'patientName', // Set default soft id
		desc: false,
	}
};

export default (
  state = initialState,
  { type, portal = {}, invoiceRoute = null, videoRoute = null, filter = {}, sort = {} }
) => {
  switch (type) {
    case PAYLOAD_PORTAL:
      return { ...state, ...portal };
    case VIDEO_SET:
      return { ...state, videoRoute };

    // issue-34 This is reusable cut this reducer up
    case PORTAL_SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...filter,
        }
      };
    // issue-34 This is reusable cut this reducer up
    case PORTAL_SET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          ...sort,
          desc: state.sort.id === sort.id ? !state.sort.desc : state.sort.desc,
        }
      }
    default:
      return state;
  }
};
