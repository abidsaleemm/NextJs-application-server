import { DEL_RENDER } from "../constants/actionTypes";

export default keys => dispatch => {
  dispatch({ type: DEL_RENDER, ...keys });
  dispatch({
    type: "server/delRender",
    ...keys
  });
};
