const { getPrice } = require('../src/helpers/coinMarketCap');

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
