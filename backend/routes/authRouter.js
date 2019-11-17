const express = require('express');
const Router = express.Router();

const authController = require('../controllers/auth');

Router.route('/')
  .post(authController.loginUser);

module.exports = Router;