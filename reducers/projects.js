import uuid from 'uuid';
import {
  PROJECT_ADD,
  PROJECT_UPDATE,
} from '../constants/actionTypes';

export default (state = [], action) => {
  const {
    type,
    studyUID = '',
    segments = [],
    vertebra = [],
    discs = {},
    payload = {},
  } = action;
  switch (type) {
    case PROJECT_ADD: {
      const index = state
        .findIndex(v => v.studyUID === studyUID);

      console.log('add', index);

      return index >= 0 ? state : //  Don't add duplicate
        [...state, {
          studyUID,
          segments,
          vertebra,
          discs,
          id: uuid(),
        }];

    }
    case PROJECT_UPDATE: {
      const index = state
        .findIndex(v => v.studyUID === studyUID);

      console.log('update', index);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ...payload,
        },
        ...state.slice(index + 1),
      ]
    }
    default:
      return state;
  }
};
