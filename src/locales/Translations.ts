export default interface Translations {
  common: {
    logout: string;
    buy: string;
    sell: string;
    coin: string;
    symbol: string;
    type: string;
    amount: string;
  };
  error: {
    notFound: {
      title: string;
      description: string;
      goHome: string;
    };
  };
  navigation: {
    dashboard: string;
    wallet: string;
    transactions: string;
    market: string;
    trade: string;
  };
  transactions: {
    noTransactions: string;
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
  dashboard: {
    balance: string;
    capital: string;
    development: string;
  };
}
