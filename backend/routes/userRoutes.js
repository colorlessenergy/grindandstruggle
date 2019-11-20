const express = require('express');
const Router = express.Router();
const usersController = require('../controllers/user');
const authController = require('../controllers/auth');

Router.route('/')
  .get(authController.validateToken, usersController.getUserPosts)
  .post(usersController.registerUser);


module.exports = Router;