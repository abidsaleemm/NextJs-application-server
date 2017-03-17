import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import mergePersistedState from 'redux-localstorage/lib/mergePersistedState';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import rootReducer from '../reducers';

const reducer = compose(
  mergePersistedState(),
)(rootReducer);

const storage = compose(
  filter([
    'dicomDirectory',
    'dicomSeries',
    'dicomImages',
    'dicomStudies',
    'selectedSeries',
    'webGLViewCamera',
    'webGLViewParentPos',
    'webGLViewParentRot',
  ])
)(adapter(localStorage));

const enhancer = compose(
  persistState(storage, 'SEGMENTATION_INTERFACE'),
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : noop => noop
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
