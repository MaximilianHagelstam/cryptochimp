const express = require('express');
const authCheck = require('../middleware/authCheck');
const userService = require('../services/userService');

const userController = express.Router();

userController.get('/', authCheck, userService.getCurrentUser);
userController.post('/buy', authCheck, userService.buyCoin);

module.exports = userController;
