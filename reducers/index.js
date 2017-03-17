import { combineReducers } from 'redux';

import * as AppReducers from './app';
import * as ProjectReducers from './projects';

const rootReducer = combineReducers({
  ...AppReducers,
  ...ProjectReducers,
});

export default rootReducer;
