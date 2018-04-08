import { DELETE_USER } from "../constants/actionTypes";

export default userId => ({
  type: DELETE_USER,
  userId
});
