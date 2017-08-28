import { FETCHING } from '../constants/actionTypes';

export default (state = false, { type, fetching = false }) => {
    switch (type) {
        case FETCHING: return fetching;
        default: return state;
    }
};