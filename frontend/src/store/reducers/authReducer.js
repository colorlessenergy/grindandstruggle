import * as ActionTypes from '../actions/ActionTypes';

const initState = {
  authError: '',
  token: undefined
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

    case ActionTypes.LOGIN_SUCCESS: 
      return {
        authError: '',
        token: action.token
      }
    
    case ActionTypes.LOGIN_ERROR:
      return {
        authError: action.error
      }

    case ActionTypes.AUTH_LOGOUT:
      return {
        token: undefined
      }

    default:
      return state;
  }
}

export default authReducer;