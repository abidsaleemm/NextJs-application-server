import {
  DELETE_USER,
  CREATE_USER,
  EDIT_USER,
  CREATE_TEAM,
  DELETE_TEAMS
} from "../constants/actionTypes";

const userListAPI = store => next => action => {
  const { type, userId, userData, teamData, teamIds} = action;

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
      store.dispatch({
        type: "server/editUser",
        userData
      });
      break;
    case CREATE_TEAM:
      store.dispatch({
        type: "server/createTeam",
        teamData
      });
      break;
    case DELETE_TEAMS:
      store.dispatch({
        type: "server/deleteTeams",
        teamIds
      });
      break;
    default:
      break;
  }
  const result = next(action);
  return result;
};

export default userListAPI;
