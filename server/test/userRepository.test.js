const mongoose = require('mongoose');
const { getUser, addCoin } = require('../src/repositories/userRepository');
const { mockUser, mockCoin } = require('./mocks');
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

describe('addCoin', () => {
  test('should create a new coin', async () => {
    await addCoin(
      mockUser.googleId,
      mockCoin.symbol,
      mockCoin.quantity,
      mockCoin.amountInvested
    );
    const { wallet } = await getUser(mockUser.googleId);

    expect(wallet[1]).toHaveProperty('symbol', mockCoin.symbol);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
