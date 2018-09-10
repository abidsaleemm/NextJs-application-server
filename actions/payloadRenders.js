import { PAYLOAD_RENDERS } from "../constants/actionTypes";

export default (payload = []) => {
  return {
    type: PAYLOAD_RENDERS,
    payload
  };
};
