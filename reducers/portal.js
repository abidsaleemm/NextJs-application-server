import {
  PAYLOAD_PORTAL,
  INVOICE_SET,
  PORTAL_SET_FILTER
} from "../constants/actionTypes";

export const initialState = {
  projects: [],
  invoiceRoute: null,
  filter: {
    patientName: "",
    studyName: "",
    modality: "",
    location: ""
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
    case PORTAL_SET_FILTER:
      return { 
				...state, 
				filter: { 
					...state.filter,
					...filter,
				} 
			};
    default:
      return state;
  }
};
