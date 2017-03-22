import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncNodeStorage } from 'redux-persist-node-storage';
import createLogger from 'redux-logger';
import * as reducers from '../reducers';

const rootReducer = combineReducers({
  ...reducers,
});

const logger = createLogger();

const enhancer = compose(
  autoRehydrate(),
  applyMiddleware(thunk),
  // applyMiddleware(thunk, logger),
);

export default (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer);
  persistStore(store, { storage: new AsyncNodeStorage('../server-store') })

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
