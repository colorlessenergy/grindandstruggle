const express = require('express');
const Router = express.Router();
const replyController = require('../controllers/reply');
const authController = require('../controllers/auth');


// reply to comment
Router.route('/comment/:commentId')
  .post(authController.validateToken, replyController.createReplyToComment);

// reply to reply
Router.route('/:replyId')
  .post(authController.validateToken, replyController.createReplyToReply);


module.exports = Router;