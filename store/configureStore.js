import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import persistProjects from './persistProjects';
import * as reducers from '../reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const enhancer = compose(
  persistProjects(),
  applyMiddleware(thunk)
);

export default (adapter) =>
  createStore(
    rootReducer,
    {},
    enhancer
  );
