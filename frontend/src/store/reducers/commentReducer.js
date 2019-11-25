import * as ActionTypes from '../actions/ActionTypes';

const initState = {};

const commentReducer = (state=initState, action) => {
  switch(action.type) {

    case ActionTypes.CREATE_COMMENT_ERROR:
      return state;

    default: 
      return state;

  }
}
export default commentReducer;