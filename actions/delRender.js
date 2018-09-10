import { DEL_RENDER } from "../constants/actionTypes";

export default keys => (console.log("action-del render----", keys),{ type: DEL_RENDER, ...keys });
