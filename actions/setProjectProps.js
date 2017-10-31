import fetchApi from "../helpers/fetchApi";
import { PROJECTDETAIL_SET_STATUS } from "../constants/actionTypes";

export default ({ studyUID, status }) => ({
  type: "server/setProjectProps",
  studyUID,
  status
});
