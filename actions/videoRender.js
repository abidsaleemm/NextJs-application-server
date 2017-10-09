import { VIDEO_RENDER } from '../constants/actionTypes';

// TODO handle with server

export default ({ window }) => (dispatch, getState) => {
    const { } = getState();
    const url = `/static/render/?p=${studyUID}`;
    const windowName = 'renderWindow';

    const width = 1920;
    const height = 1080;

    const settings = `width=${width},height=${height},resizable=false,toolbar=false,status=false`;

    console.log('window open', url, document)
    // TODO Handled as server process
    const window = window.open(url, windowName, settings);

    dispatch({ type: VIDEO_RENDER, window });
}