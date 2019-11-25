import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';

import commentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  posts: postReducer,
  newComment: commentReducer
});