import * as ActionTypes from '../actions/ActionTypes';

const initState = {
  authError: ''
}

const authReducer = (state=initState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_SUCCESS:
      return {
        authError: ''
      }

    case ActionTypes.REGISTER_ERROR:
      return {
        authError: action.error
      }

    default:
      return state;
  }
}

export default authReducer;