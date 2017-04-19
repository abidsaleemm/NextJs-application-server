import { applyMiddleware, compose } from 'redux';
import array from 'lodash/array';

// const persistProjectsMiddleware = (adapter) => (store) => (next) => (action) => {
//   const { projects: projectsPrev } = store.getState();
//   const result = next(action);
//   const { projects } = store.getState();

//   if (projects !== projectsPrev) {
//     const diff = array.difference(projectsPrev, projects);
//     diff.forEach(project => {
//       const { studyUID } = project;
//       if (studyUID !== undefined) {
//         adapter.setProject(studyUID, project);
//       }
//     })
//   }
//   return result;
// };

// Higher order reducer
const mergeState = (merge = (i, p) =>
  ({...i, ...p})) => (next) => (state, action) => {
    const finalState = action.type === 'INIT_PROJECTS' && action.payload
      ? merge(state, action.payload)
      : state;

    return next(finalState, action);
  };

export default (adapter) => (createStore) => (reducer, initialState) => {
  const persistReducer = compose(
    mergeState(),
  )(reducer);

  const store = createStore(persistReducer, initialState);

  adapter.getProjects((err, projects = []) => {
    store.dispatch({
      type: 'INIT_PROJECTS',
      payload: { projects },
    });
  });

  // Use an interval to save the state
  let projectsPrev = [];
  const stateSyncInterval = setInterval(() => {
    const { projects } = store.getState();

    if (projects !== projectsPrev) {
      const diff = array.difference(projectsPrev, projects);
      // console.log('diff', diff);

      diff.forEach(project => {
        const { studyUID } = project;

        if (studyUID !== undefined) {
          adapter.setProject(studyUID, project);
        }
      })
    }

    projectsPrev = projects;
  }, 5000);

  return store;
};
