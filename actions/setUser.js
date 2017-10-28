import { USER_SET } from "../constants/actionTypes";

export default user => {
  return {
    type: USER_SET,
    user
  };
};
