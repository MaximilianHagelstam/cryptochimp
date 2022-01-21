const mongoose = require('mongoose');
const { getUser } = require('../src/repositories/userRepository');
const { mockUser } = require('./mocks');
const User = require('../src/models/User');
const connectDatabase = require('../src/config/connectDatabase');

beforeEach(async () => {
  await connectDatabase();
  await User.create(mockUser);
});

describe('getUser', () => {
  test('should return mockUser', async () => {
    const user = await getUser(mockUser.googleId);
    expect(user).toHaveProperty('googleId', mockUser.googleId);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
