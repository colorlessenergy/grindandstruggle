import * as ActionTypes from './ActionTypes';

const config = require('../../config/config');


export const getAllPosts = () => {
  return (dispatch, getState) => {
    console.log(config.BACKEND_URL, config.BACKEND_URL + '/posts');
    fetch(config.BACKEND_URL + '/posts')
      .then((res) => {
        return res.json();
      })
      .then((posts) => {
        dispatch({ type: ActionTypes.GET_POST_SUCCESS, posts: posts })
      })
      .catch(err => dispatch({ type: ActionTypes.GET_POST_ERROR, error: err}));
  }
};

/**
 * get a single post
 * from the DB with the comments
 * in an array
 * 
 * @param {String} id - id of the post
 */

export const getSinglePost = (id) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/posts/' + id)
      .then((res) => res.json())
      .then(post => {
        dispatch({ type: ActionTypes.GET_SINGLE_POST_SUCCESS, post: post })
      })
      .catch (err => dispatch({ type: ActionTypes.GET_SINGLE_POST_ERROR, error: err }));
  }
}

export const createPost = (post, history) => {
  return (dispatch, getState) => {
    fetch (config.BACKEND_URL + '/posts', {
      headers:
        { 'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token') },
      method: 'POST',
      body: JSON.stringify(post)
    })
    .then((res) => res.json())
    .then((post) => {
      dispatch({ type: ActionTypes.CREATE_POST_SUCCESS })
      history.push('/post/' + post._id);
    })
    .catch(err => dispatch({ type: ActionTypes.CREATE_POST_ERROR, error: err}));
  }
}