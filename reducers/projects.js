import {
  PROJECT_ADD
} from '../constants/actionTypes';

function projectAdd(state, action) {
  const { projectName } = action;
  return {
    ...state,
    [projectName] : {},
  }
}

function projectDelete(state, action) {
  return state;
}

function projectModule(state, action) {

}

export function projects(state = {}, action) {
  const { type } = action;
  switch(type) {
    case 'PROJECT_ADD': projectAdd(state, action);
    case 'PROEJCT_DELETE': projectDelete(state, action);
    // case 'PROJECT_OBJECT_ADD': projectObjectAdd(state, action);
    case 'PROJECT_MODULE': projectModule(state, action);
    default: return state;
  };
}
