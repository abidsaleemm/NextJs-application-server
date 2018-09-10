import {
  CREATE_TEAM,
  PAYLOAD_TEAMS,
  DELETE_TEAMS
} from "../constants/actionTypes";

export const initialState = [];

export default (
  state = initialState,
  { type, teamData, teamList = {}, teamIds }
) => {
  switch (type) {
    case CREATE_TEAM:
      return state.concat([teamData]);
    case PAYLOAD_TEAMS:
      return teamList;
    case DELETE_TEAMS:
      return state.filter(team => !teamIds.find( id => id === team.id));
    default:
      return state;
  }
};
