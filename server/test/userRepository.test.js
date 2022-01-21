const mongoose = require('mongoose');
const {
  getUser,
  addCoin,
  removeCoin,
  updateCoin,
} = require('../src/repositories/userRepository');
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

describe('removeCoin', () => {
  test('should remove coin added in previous test', async () => {
    await removeCoin(mockUser.googleId, mockCoin.symbol);

    const { wallet } = await getUser(mockUser.googleId);

    expect(wallet.some((coin) => coin.symbol === mockCoin.symbol)).toEqual(
      false
    );
  });
});

describe('updateCoin', () => {
  test('should update mock users initial coin', async () => {
    const updatedAmountInvested = 6681.626974931858;
    const updatedQuantity = 2;

    await updateCoin(
      mockUser.googleId,
      mockUser.wallet[0].symbol,
      updatedQuantity,
      updatedAmountInvested
    );

    const { wallet } = await getUser(mockUser.googleId);

    expect(
      wallet[0].quantity === updatedQuantity &&
        wallet[0].amountInvested === updatedAmountInvested
    ).toEqual(false);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
