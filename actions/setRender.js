import { SET_RENDER } from "../constants/actionTypes";

export default ({
  studyUID,
  template,
  anonymous = false,
  debug = false,
  ...props
}) => dispatch => {
  dispatch({
    ...props,
    type: SET_RENDER,
    studyUID,
    template,
    anonymous,
    debug
  });

  dispatch({
    ...props,
    type: "server/setRender",
    studyUID,
    template,
    anonymous,
    debug
  });
};
