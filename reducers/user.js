import { USER_SET } from "../constants/actionTypes";

export default (state = {}, { type, user = {} }) => {
  switch (type) {
    case USER_SET:
      return {
        ...state,
        ...user
      };
    default: return state;
  }
};
