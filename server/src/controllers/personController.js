const express = require('express');
const { body } = require('express-validator');
const personService = require('../services/personService');

const personController = express.Router();

personController.get('/', personService.findAll);
personController.post(
  '/',
  body('name').isString(),
  body('number').isString(),
  personService.add,
);
personController.get('/:id', personService.findId);
personController.delete('/:id', personService.deleteId);
personController.patch('/:id', personService.updateId);

module.exports = personController;
