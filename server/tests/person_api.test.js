const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');
const Person = require('../src/models/Person');

const api = supertest(app);

const initialPersons = [
  {
    name: 'James',
    number: '123',
  },
  {
    name: 'Charles',
    number: '456',
  },
];

beforeEach(async () => {
  let personObject = new Person(initialPersons[0]);
  await personObject.save();
  personObject = new Person(initialPersons[1]);
  await personObject.save();
});

test('all persons are returned', async () => {
  const res = await api.get('/api/persons');

  expect(res.body).toHaveLength(initialPersons.length);
});

afterAll(async () => {
  await Person.deleteMany({});
  mongoose.connection.close();
});
