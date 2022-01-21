const {
  getPrice,
  calculateWalletData,
} = require('../src/helpers/coinMarketCap');
const { mockUser, mockWalletResult } = require('./mocks');

const mockWallet = mockUser.wallet;

describe('getPrice with correct symbol', () => {
  test('should return number', async () => {
    const price = await getPrice('BTC');
    expect(typeof price === 'number').toBeTruthy();
  });
});

describe('getPrice with incorrect symbol', () => {
  test('should return null', async () => {
    const price = await getPrice('notarealsymbol');
    expect(price).toBeNull();
  });
});

describe('calculateWalletData with mock wallet', () => {
  test('should return array containing mock result', async () => {
    const wallet = await calculateWalletData(mockWallet);
    expect(wallet).toEqual(mockWalletResult);
  });
});
