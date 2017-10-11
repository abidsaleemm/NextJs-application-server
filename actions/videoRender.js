import { VIDEO_RENDER } from '../constants/actionTypes';

// TODO handle with server
export default ({ window }) => (dispatch, getState) => {
    // TODO Finish
    dispatch({ type: VIDEO_RENDER, window });
}