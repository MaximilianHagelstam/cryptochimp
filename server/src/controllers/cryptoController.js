const express = require('express');
const cryptoService = require('../services/cryptoController');

const cryptoController = express.Router();

cryptoController.get('/', cryptoService.getAllCoins);

module.exports = cryptoController;
