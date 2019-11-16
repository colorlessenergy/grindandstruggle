const express = require('express');
const Router = express.Router();
const usersController = require('../controllers/user');

Router.route('/')
  .post(usersController.registerUser);


module.exports = Router;