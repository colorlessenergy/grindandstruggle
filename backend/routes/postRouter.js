const express = require('express');
const Router = express.Router();
const postsController = require('../controllers/post');
const authController = require('../controllers/auth');

Router.route('/')
  .get(postsController.getAllPosts)
  .post(authController.validateToken, postsController.createPost);

Router.route('/:id')
  .get(postsController.getPostById)

module.exports = Router;