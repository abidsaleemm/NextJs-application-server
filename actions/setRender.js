import { SET_RENDER } from "../constants/actionTypes";

export default ({ studyUID, template, anonymous, debug }) => ({
  type: SET_RENDER,
  studyUID,
  template,
  anonymous,
  debug
});
