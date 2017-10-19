import { PAYLOAD_PORTAL } from "../constants/actionTypes";

export const initialState = {
	projects: [],
};

export default ( state = {}, { type, portal = {} } ) => {
  switch (type) {
    case PAYLOAD_PORTAL:
      return { ...state, ...portal };
    default:
      return state;
  }
};
