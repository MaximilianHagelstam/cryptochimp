const express = require('express');
const { body } = require('express-validator');
const personService = require('../services/personService');

const personRouter = express.Router();

personRouter.get('/', personService.findAll);
personRouter.post(
  '/',
  body('name').isString(),
  body('number').isString(),
  personService.add,
);
personRouter.get('/:id', personService.findId);
personRouter.delete('/:id', personService.deleteId);
personRouter.patch('/:id', personService.updateId);

module.exports = personRouter;
