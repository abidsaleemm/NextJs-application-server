import { SET_RENDER, DEL_RENDER } from "../constants/actionTypes";

export const initialState = {
  data: []
};

export default (state = initialState, { type, studyUID, template, anonymous = false, debug = false }) => {
  switch (type) {
    case DEL_RENDER:
      return {
        data: state.data.filter((render) => (render.studyUID != studyUID) || (render.template != template) || (render.anonymous != anonymous) || (render.debug != debug))
      };
    case SET_RENDER:
      return {
        data: state.data.concat({ studyUID, template, anonymous, debug})
      };
    default:
      return state;
  }
};
