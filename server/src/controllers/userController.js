const express = require('express');
const authCheck = require('../middleware/authCheck');
const userService = require('../services/userService');

const userController = express.Router();

userController.get('/', authCheck, userService.getCurrentUser);

module.exports = userController;
