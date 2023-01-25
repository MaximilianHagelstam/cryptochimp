export type Translations = {
  common: {
    logout: string;
    buy: string;
    sell: string;
    coin: string;
    symbol: string;
    type: string;
    quantity: string;
    loading: string;
  };
  error: {
    error: string;
    oops: string;
    noTransactions: string;
    emptyWallet: string;
    emptyPortfolio: string;
    investInFirstCoin: string;
    here: string;
    notFound: {
      title: string;
      description: string;
      goHome: string;
    };
  };
  navigation: {
    wallet: string;
    transactions: string;
    market: string;
    trade: string;
  };
  transactions: {
    pricePerCoin: string;
    date: string;
    total: string;
    selectSymbols: string;
    allTypes: string;
    previous: string;
    next: string;
    page: string;
    of: string;
  };
  trade: {
    confirmOrder: string;
    cancel: string;
  };
  wallet: {
    balance: string;
    capital: string;
    development: string;
    portfolio: string;
    price: string;
    totalValue: string;
    name: string;
  };
  market: {
    marketCap: string;
  };
};
