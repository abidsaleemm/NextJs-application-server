import {
  CREATE_TEAM,
  PAYLOAD_TEAMS
} from "../constants/actionTypes";

export const initialState = {
  data: []
};

export default (
  state = initialState,
  { type, teamData, teamList = {} }
) => {
  switch (type) {
    case CREATE_TEAM:
      console.log("--------fffff", teamData,"-------state-----",state);
      return {
        data: state.data.concat([teamData])
      };
    case PAYLOAD_TEAMS:
      console.log("------ddddddd", teamList);
      return teamList;
    default:
      return state;
  }
};
