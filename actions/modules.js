import {
  PROJECT_ADD,
  PROJECT_DELETE,
} from '../constants/actionTypes';

export function projectAdd(projectName) {
  // TODO check for duplicate use thunk

  return {
    type: PROJECT_ADD,
    projectName,
    // projectKey,
  }
}

export function projectRemove(projectName) {
  //TODO
  
}
