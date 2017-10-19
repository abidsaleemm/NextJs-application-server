import { VIDEO_SET } from "../constants/actionTypes";

export default (state = null, { type, videoRoute = null }) => {
  switch (type) {
    case VIDEO_SET:
      return videoRoute;
    default:
      return state;
  }
};
