import * as ActionTypes from './ActionTypes';

const config = require('../../config/config');

export const registerAction = (user, history) => {
  return (dispatch, getState) => {
    fetch (config.BACKEND_URL + '/users', {
      headers: 
        { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then((res) => {
      if (!res.ok) {
        return dispatch({ type: ActionTypes.REGISTER_ERROR, error: 'Email or Username already registered' });
      }
      
      dispatch({ type: ActionTypes.REGISTER_SUCCESS });
      history.push('/login')
    })
    .catch(err => {
      dispatch({ type: ActionTypes.REGISTER_ERROR, error: err });
    });
  }
}