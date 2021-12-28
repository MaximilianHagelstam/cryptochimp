const { validationResult } = require('express-validator');
const Person = require('../models/Person');

const findAll = async (req, res) => {
  const persons = await Person.find();
  res.send(persons);
};

const add = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, number } = req.body;

  const person = new Person({ name, number });
  await person.save();
  res.send(person);
};

const findId = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    res.send(person);
  } catch {
    res.status(404).json({ error: 'id not found' });
  }
};

const deleteId = async (req, res) => {
  try {
    await Person.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch {
    res.status(404).send({ error: 'id not found' });
  }
};

const updateId = async (req, res) => {
  try {
    const { name, number } = req.body;
    const person = await Person.findById(req.params.id);

    if (name === undefined && number === undefined) {
      return res.status(400).send({ error: 'content missing' });
    }

    if (name) {
      person.name = name;
    }

    if (number) {
      person.number = number;
    }

    await person.save();
    res.json(person);
  } catch {
    res.status(404).send({ error: 'id not found' });
  }
};

module.exports = { findAll, add, findId, deleteId, updateId };
