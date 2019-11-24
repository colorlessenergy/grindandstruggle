const express = require('express');
const Router = express.Router();

const commentsController = require('../controllers/comment');
const authController = require('../controllers/auth');

Router.route('/')
  .get(commentsController.getAllComments)

Router.route('/:id')
  .post(authController.validateToken, commentsController.createComment);

module.exports = Router;