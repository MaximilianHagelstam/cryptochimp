const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../src/app');

const api = supertest(app);

describe('GET /api/crypto?limit=3', () => {
  test('should return an array of length 3', async () => {
    const res = await api.get('/api/crypto?limit=3');

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual('application/json');
    expect(res.body.length).toEqual(3);
  });
});

describe('GET /api/crypto', () => {
  test('should fail with status 400', async () => {
    const res = await api.get('/api/crypto');

    expect(res.statusCode).toEqual(400);
    expect(res.type).toEqual('application/json');
    expect(res.body.error.name).toEqual('Error');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
