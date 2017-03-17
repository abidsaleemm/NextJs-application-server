import {
  ADD_COMMENT,
} from '../constants/actionTypes';

// import { createReducer } from 'redux-create-reducer';

// projects

export function importObject(state, action) {
  // console.log('import object')
  // const {payload} = action;
  // const {postId, commentId, commentText} = payload;
  //
  // // State here is the entire combined state
  // const updatedWithPostState = dotProp.set(
  //     state,
  //     `posts.byId.${postId}.comments`,
  //     comments => comments.concat(commentId)
  // );
  //
  // const updatedWithCommentsTable = dotProp.set(
  //     updatedWithPostState,
  //     `comments.byId.${commentId}`,
  //     {id : commentId, text : commentText}
  // );
  //
  // const updatedWithCommentsList = dotProp.set(
  //     updatedWithCommentsTable,
  //     `comments.allIds`,
  //     allIds => allIds.concat(commentId);
  // );
  //
  // return updatedWithCommentsList;
  return {
    ...state,
  };
}

export function reducer(state = {}, action) {
  const { type } = action;
  switch(type) {
    case "ADD_COMMENT" : return importObject(state, action);
    default: return state;
  }
}

//
// export default combineReducers({
//     byId : postsById,
//     allIds : allPosts
// });

//
// export const featureReducers = createReducer({}, {
//     ADD_COMMENT : importObject,
// };
