import { GET_TEAMS } from "../constants/actionTypes";

export default (teams = {}) => {
  return {
    type: GET_TEAMS,
    teams
  };
};
