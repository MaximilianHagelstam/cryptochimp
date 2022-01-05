const express = require('express');
const authCheck = require('../middleware/authCheck');
const userService = require('../services/userService');

const userController = express.Router();

userController.get('/', authCheck, userService.getCurrentUser);
userController.post('/buy', authCheck, userService.buyCoin);
userController.post('/sell', authCheck, userService.sellCoin);
userController.get('/wallet', authCheck, userService.getWalletData);

module.exports = userController;
