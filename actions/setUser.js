import { USER_SET } from "../constants/actionTypes";

export default (user = {}) => {
  const { role = "user", id = 0, name = "" , teams} = user;
  return {
    type: USER_SET,
    user: {
      role,
      id,
      name,
      teams
    }
  };
};
