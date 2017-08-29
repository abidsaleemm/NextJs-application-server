import {
  PAYLOAD_PORTAL,
  INVOICE_SET,
  PORTAL_SET_FILTER,
  PORTAL_SET_SORT,
} from "../constants/actionTypes";

export const initialState = {
  projects: [],
  invoiceRoute: null,
  filter: {
    patientName: "",
    studyName: "",
    modality: "",
    location: ""
  },
  sort: {
		id: '', // Set default soft id
		desc: false,
	}
};

export default (
  state = initialState,
  { type, portal = {}, invoiceRoute = null, filter = {} }
) => {
  switch (type) {
    case PAYLOAD_PORTAL:
      return { ...state, ...portal };
    case INVOICE_SET:
      return { ...state, invoiceRoute };
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
