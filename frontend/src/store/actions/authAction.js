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

export const loginAction = (user, history) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/auth', {
      headers:
        { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(res => {
      if (!res.ok) {
        return res.text()
          .then((text) => dispatch({ type: ActionTypes.LOGIN_ERROR, error: text }));
      } 

      return res.json()
        .then(token => {
          dispatch({ type: ActionTypes.LOGIN_SUCCESS });

          localStorage.setItem('token', token.token);
          
          history.push('/');
        });
    })
    .catch((err) => dispatch({ type: ActionTypes.LOGIN_ERROR, error: err }));
  }
}

export const logoutAction = (req, res, next) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/auth', {
      headers: {
        'authorization': localStorage.getItem('token')
      },
      method: 'DELETE'
    })
    .then((res) => {
      localStorage.removeItem('token');
    })
    .catch((err) => {
      localStorage.removeItem('token');
    })
  }
}