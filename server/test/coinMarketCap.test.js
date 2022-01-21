const {
  getPrice,
  calculateWalletData,
} = require('../src/helpers/coinMarketCap');

const mockWallet = [
  {
    symbol: 'ETH',
    quantity: 3,
    amountInvested: 9681.626974931858,
    _id: '61dddac89a4b30260cef3a1d',
  },
];

const mockResult = [
  {
    _id: '61dddac89a4b30260cef3a1d',
    symbol: 'ETH',
    quantity: 3,
    amountInvested: 9681.626974931858,
    currentPrice: 3500,
    profit: 818.3730250681419,
    profitPct: 8.452846067991603,
  },
];

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
    expect(wallet).toEqual(mockResult);
  });
});
