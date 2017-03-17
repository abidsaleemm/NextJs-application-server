// import {
//   PROJECT_ADD,
// } from '../constants/actionTypes';

function objectAdd(state, action) {
  const { objectName } = action;
  return [
    ..state,
    [objectName]: {},
  ]
}

// function projectDelete(state, action) {
//   return state;
// }

export function objects(state = {}, action) {
  case 'OBJECT_ADD': objectAdd(state, action);
  // case 'OBEJCT': projectDelete(state, action);
  default: return state;
}
