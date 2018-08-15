import { PAYLOAD_USERS, DELETE_USER, CREATE_USER, EDIT_USER } from "../constants/actionTypes";

export const initialState = {
  data: [{ id: 1, name: "Apple" }, { id: 2, name: "Pear" }, { id: 3, name: "Banana" }]
};

export default (state = initialState, { type, users = {}, userId, userData = {} }) => {
  const { password, ..._userData } = userData;
  switch (type) {
    case PAYLOAD_USERS:
      return { ...users };
    case DELETE_USER:
      return {
        data: state.data.filter(user => user.id !== userId).map(({ password, ...user }) => user)
      };
    case EDIT_USER:
      return {
        data: state.data.map(({ password, ...user }) => (user.id !== userData.id ? user : _userData))
      };
    case CREATE_USER:
      return {
        data: state.data.concat([userData]).map(({ password, ...user }) => user)
      };
    default:
      return state;
  }
};
