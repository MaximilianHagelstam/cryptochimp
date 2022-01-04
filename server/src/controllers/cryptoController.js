const express = require('express');
const cryptoService = require('../services/cryptoService');

const cryptoController = express.Router();

cryptoController.get('/all', cryptoService.getAllCoins);
cryptoController.get('/price', cryptoService.getPrice);

module.exports = cryptoController;
