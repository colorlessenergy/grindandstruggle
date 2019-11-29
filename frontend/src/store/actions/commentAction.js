import * as ActionTypes from './ActionTypes';
import { getSinglePost } from './postAction';

const config = require('../../config/config');


export const createCommentAction = (comment,id) => {
  return (dispatch, getState) => {
    fetch(config.BACKEND_URL + '/comments/' + id, {
      headers:
      {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(comment)
    })
    .then((res) => res.json())
    // when creating a comment fetch the post with all comments again
    // to add the comment to the page automatically
    .then(() => dispatch(getSinglePost(id)))
    .catch((err) => dispatch({ type: ActionTypes.CREATE_COMMENT_ERROR, error: err }));
  }
}

export const createReplyAction = (reply, commentId, postId) => {
  return (dispatch, getState) => {
    // remove the 'a' i added to be able to get the form
    // information dynamically
    commentId = commentId.split('').splice(1).join('');
    fetch(config.BACKEND_URL + '/replies/' + commentId, {
      headers:
      {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(reply)
    })
    .then((res) => res.json())
    // when creating a reply fetch the post with all replies again
    // to add the reply to the page automatically
    .then(() => dispatch(getSinglePost(postId)))
    .catch((err) => dispatch({ type: ActionTypes.CREATE_REPLY_ERROR, error: err }));
  }
}