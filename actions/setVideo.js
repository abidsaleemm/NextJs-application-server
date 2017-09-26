import { VIDEO_SET } from '../constants/actionTypes';

export default (studyUID) => ({
    type: VIDEO_SET,
    videoRoute: studyUID ? `/video/?id=${studyUID}` : null,
});