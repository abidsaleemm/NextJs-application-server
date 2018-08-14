import { PAYLOAD_TEAMS } from "../constants/actionTypes";

export default (teamList = {}) => {
  return {
    type: PAYLOAD_TEAMS,
    teamList
  };
};
