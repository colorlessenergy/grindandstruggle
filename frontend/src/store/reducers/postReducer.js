import * as ActionTypes from '../actions/ActionTypes';

const initState = {
  posts: '',
  error: ''
}

const postReducer = (state=initState, action) => {
  switch (action.type) {
    case ActionTypes.GET_POST_SUCCESS: 
      return {
        posts: action.posts
      }

    case ActionTypes.GET_POST_ERROR:
      return {
        error: action.error
      };
      
    case ActionTypes.GET_SINGLE_POST_SUCCESS:
      return {
        post: action.post
      }

    case ActionTypes.GET_SINGLE_POST_ERROR:
      return {
        error: action.error
      };

    case ActionTypes.CREATE_POST_SUCCESS:
      return state
    
    case ActionTypes.CREATE_POST_ERROR:
      return {
        error: action.error
      }

    case ActionTypes.CREATE_COMMENT_ERROR:
      return state;

    default:
      return state;
  }
}

export default postReducer;