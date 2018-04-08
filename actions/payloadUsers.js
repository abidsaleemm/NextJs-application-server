import { PAYLOAD_USERS } from "../constants/actionTypes";

export default (users = {}) => {
  return {
    type: PAYLOAD_USERS,
    users
  };
};
