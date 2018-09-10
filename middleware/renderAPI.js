import {
  DEL_RENDER,
  SET_RENDER
} from "../constants/actionTypes";

const renderAPI = store => next => action => {
  const { type, studyUID, template, anonymous, debug } = action;

  switch (type) {
    case DEL_RENDER:
      store.dispatch({
        type: "server/delRender",
        studyUID,
        template,
        anonymous,
        debug
      });
      break;
    case SET_RENDER:
      store.dispatch({
        type: "server/setRender",
        studyUID,
        template,
        anonymous,
        debug
      });
      break;
    default:
      break;
  }
  const result = next(action);
  return result;
};

export default renderAPI;
