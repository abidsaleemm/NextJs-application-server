import {
  CREATE_TEAM,
  PAYLOAD_TEAMS,
  DELETE_TEAMS
} from "../constants/actionTypes";

export const initialState = {
  data: []
};

export default (
  state = initialState,
  { type, teamData, teamList = {}, teamIds }
) => {
  switch (type) {
    case CREATE_TEAM:
      return {
        data: state.data.concat([teamData])
      };
    case PAYLOAD_TEAMS:
      return teamList;
    case DELETE_TEAMS:
      return {
        data: state.data.filter(team => !teamIds.find( id => id === team.id))
      };
    default:
      return state;
  }
};
