import { PAYLOAD_PORTAL, VIDEO_SET } from "../constants/actionTypes";

export const initialState = {
	projects: [],
};

export default (
  state = {},
  { type, portal = {}, invoiceRoute = null, videoRoute = null }
) => {
  switch (type) {
    case PAYLOAD_PORTAL:
      return { ...state, ...portal };
    case VIDEO_SET:
      return { ...state, videoRoute };

    default:
      return state;
  }
};
