import { USER_SET } from "../constants/actionTypes";

export default (user = {}) => {
  const { admin = false, id = 0, name = "" } = user;
  return {
    type: USER_SET,
    user: {
      admin,
      id,
      name
    }
  };
};
