import { SET_SESSIONS } from "../constants/actionTypes";

export default (state = {}, { type, sessions }) => {
  switch (type) {
    case SET_SESSIONS:
      return sessions !== undefined ? { ...sessions } : state;
    default:
      return state;
  }
};
