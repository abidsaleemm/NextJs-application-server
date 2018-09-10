import { SET_RENDER, DEL_RENDER } from "../constants/actionTypes";

export const initialState = [];

export default (
  state = initialState,
  { type, studyUID, template, anonymous = false, debug = false }
) => {
  switch (type) {
    case DEL_RENDER:
      return state.filter(
          render =>
            render.studyUID != studyUID ||
            render.template != template ||
            render.anonymous != anonymous ||
            render.debug != debug
        );
    case SET_RENDER:
      if (
        !state.filter(
          render =>
            render.studyUID == studyUID &&
            render.template == template &&
            render.anonymous == anonymous &&
            render.debug == debug
        ).length
      )
        return state.concat({ studyUID, template, anonymous, debug });
    default:
      return state;
  }
};
