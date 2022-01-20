const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');

const api = supertest(app);

test('/ returns json', async () => {
  await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
