const express = require('express');
const indexService = require('../services/indexService');

const indexController = express.Router();

indexController.get('/', indexService.healthCheck);

module.exports = indexController;
