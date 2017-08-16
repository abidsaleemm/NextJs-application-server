import { FETCHING } from '../constants/actionTypes';
export default (fetching = false) => ({ type: FETCHING, fetching })