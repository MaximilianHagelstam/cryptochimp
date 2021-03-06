const mockWallet = [
  {
    symbol: 'ETH',
    quantity: 3,
    amountInvested: 9681.626974931858,
    _id: '61dddac89a4b30260cef3a1d',
  },
];

const mockWalletResult = [
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

const mockUser = {
  googleId: '112550137473669450765',
  displayName: 'James Doe',
  avatar:
    'https://lh3.googleusercontent.com/a-/AOh14GhmhVxtn_tkd9vIhfkRRyAIB1ErarmX0CTRYq-5PQ=s96-c',
  cash: 90.342622488483,
  wallet: mockWallet,
};

const mockCoin = {
  symbol: 'SOL',
  quantity: 100,
  amountInvested: 100 * 123.69397689265394,
};

module.exports = { mockWallet, mockWalletResult, mockUser, mockCoin };
