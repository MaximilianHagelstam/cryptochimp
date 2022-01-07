const express = require('express');
const cryptoService = require('../services/cryptoService');

const cryptoController = express.Router();

cryptoController.get('/', cryptoService.getAllCoins);

module.exports = cryptoController;
