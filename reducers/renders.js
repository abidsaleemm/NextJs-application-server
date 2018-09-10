import {
  SET_RENDER,
  DEL_RENDER,
  PAYLOAD_RENDERS
} from "../constants/actionTypes";

export const initialState = [];

export default (
  state = initialState,
  {
    type,
    studyUID,
    template,
    anonymous = false,
    debug = false,
    payload = [],
    ...props
  }
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
    case SET_RENDER: {
      const index = state.findIndex(
        render =>
          render.studyUID == studyUID &&
          render.template == template &&
          render.anonymous == anonymous &&
          render.debug == debug
      );

      return index >= 0
        ? [
            ...state.slice(0, index),
            { ...state[index], ...props },
            ...state.slice(index + 1)
          ]
        : [...state, { ...props, studyUID, template, anonymous, debug }];
    }
    case PAYLOAD_RENDERS:
      return [...payload];
    default:
      return state;
  }
};
