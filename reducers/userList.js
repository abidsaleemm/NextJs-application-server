import {
  PAYLOAD_USERS,
  DELETE_USER,
  CREATE_USER,
  EDIT_USER
} from "../constants/actionTypes";

export const initialState = {
  data: [
    { id: 1, name: "Apple" },
    { id: 2, name: "Pear" },
    { id: 3, name: "Banana" }
  ]
};

export default (
  state = initialState,
  { type, users = {}, userId, userData }
) => {
  switch (type) {
    case PAYLOAD_USERS:
      return users;
    case DELETE_USER:
      return {
        data: state.data.filter(user => user.id !== userId)
      };
    case EDIT_USER:
      //TODO: replace user with given payload
      return {
        data: state.data
          .map(user => user.id !== userData.id ? user : userData)
      };
    case CREATE_USER:
      return {
        data: state.data.concat([userData])
      };
    default:
      return state;
  }
};
