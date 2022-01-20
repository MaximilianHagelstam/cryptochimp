const express = require('express');
const buyCoinDto = require('../dto/buyCoinDto');
const sellCoinDto = require('../dto/sellCoinDto');
const authCheck = require('../middleware/authCheck');
const validateRequest = require('../middleware/validateRequest');
const userService = require('../services/userService');

const userController = express.Router();

userController.get('/', authCheck, userService.getCurrentUser);
userController.post(
  '/buy',
  authCheck,
  validateRequest(buyCoinDto),
  userService.buyCoin
);
userController.post(
  '/sell',
  authCheck,
  validateRequest(sellCoinDto),
  userService.sellCoin
);
userController.get('/wallet', authCheck, userService.getWalletData);

module.exports = userController;
