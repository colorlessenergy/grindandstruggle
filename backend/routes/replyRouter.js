const express = require('express');
const Router = express.Router();
const replyController = require('../controllers/reply');
const authController = require('../controllers/auth');


// reply to comment
Router.route('/:commentId')
  .post(authController.validateToken, replyController.createReplyToComment);

module.exports = Router;