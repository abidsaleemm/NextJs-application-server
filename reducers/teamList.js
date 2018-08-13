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
      return {
        data: state.data.concat([teamData])
      };
    case PAYLOAD_TEAMS:
      return teamList;
    default:
      return state;
  }
};
