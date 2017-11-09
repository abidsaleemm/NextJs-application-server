import { DEFAULTS_SET_LIST } from "../constants/actionTypes";

export default (state = [], { type, list }) => {
  switch (type) {
    case DEFAULTS_SET_LIST:
      return [...list];
    default:
      return state;
  }
};
