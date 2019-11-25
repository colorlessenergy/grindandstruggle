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
    .then((comment) => dispatch(getSinglePost(id)))
    .catch((err) => dispatch(ActionTypes.CREATE_COMMENT_ERROR));
  }
}