import { applyMiddleware, compose } from 'redux';
import array from 'lodash/array';
// import adapterSQLite from './adapterSQLite'; // TODO use this as a default

const persistProjectsMiddleware = (adapter) => (store) => (next) => (action) => {
  const { projects: projectsPrev } = store.getState();

  const result = next(action);
  const { projects } = store.getState();

  if (projects !== projectsPrev) {
    const diff = array.difference(projectsPrev, projects);
    diff.forEach(project => {
      const { studyUID } = project;

      if (studyUID !== undefined) {
        adapter.setProject(studyUID, project);
      }
    })
  }

  return result;
};

// Higher order reducer
const mergeState = (merge = (i, p) =>
  ({...i, ...p})) => (next) => (state, action) => {
    const finalState = action.type === 'INIT_PROJECTS' && action.payload
      ? merge(state, action.payload)
      : state;

    return next(finalState, action);
  };

export default (adapter) => (createStore) => (reducer, initialState) => {
  const enhancer = applyMiddleware(
    persistProjectsMiddleware(adapter)
  );

  const persistReducer = compose(
    mergeState(),
  )(reducer);

  const store = enhancer(createStore)(persistReducer, initialState);

  adapter.getProjects((err, projects = []) => {
    store.dispatch({
      type: 'INIT_PROJECTS',
      payload: { projects },
    });
  });

  return store;
};
