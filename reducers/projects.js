import uuid from 'uuid';
import {
  PROJECT_ADD,
  PROJECT_UPDATE,
} from '../constants/actionTypes';

// TODO need to add better module support
// import importDiscs from '../modules/spine/helpers/importDiscs';
// import importSegments from '../modules/spine/helpers/importSegments';
// import importVertebra from '../modules/spine/helpers/importVertebra';

// issue-28
export default (state = [], action) => {
  const {
    type,
    studyUID = '',
    segments = [],
    vertebra = [],
    discs = {},
    payload,
  } = action;
  switch (type) {
    case PROJECT_ADD: {
      const index = state
        .findIndex(v => v.studyUID === studyUID);

      // const segments = importSegments();
      // const vertebra = importVertebra(segments);
      // const discs = importDiscs();

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

      return [
        ...state.slice(0, index),
        {
          ...payload, // TODO Do merge
        },
        ...state.slice(index + 1),
      ]
    }
    default:
      return state;
  }
};
