import {
  DELETE_USER,
  CREATE_USER,
  EDIT_USER
} from "../constants/actionTypes";

const userListAPI = store => next => action => {
  const { type, userId, userData } = action;
  switch (type) {
    case DELETE_USER:
      store.dispatch({
        type: "server/deleteUser",
        userId
      });
      break;
    case CREATE_USER:
      store.dispatch({
        type: "server/createUser",
        userData
      });
      break;
    case EDIT_USER:
      console.log("EDIT USER Middleware", userData);
      store.dispatch({
        type: "server/editUser",
        userData
      });
      break;
    //TODO: add EDIT_USER case
  }
  const result = next(action);
  return result;
};

export default userListAPI;
