const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');

const api = supertest(app);

describe('GET / should', () => {
  test('return json message with code 200', async () => {
    const res = await api.get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual('application/json');
    expect(res.body.message).toEqual('Server running');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
