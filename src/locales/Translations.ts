export default interface Translations {
  common: {
    logout: string;
    buy: string;
    sell: string;
  };
  error: {
    notFound: {
      title: string;
      description: string;
      goHome: string;
    };
  };
  navLinks: {
    dashboard: string;
    wallet: string;
    transactions: string;
    market: string;
    trade: string;
  };
  transactions: {
    noTransactions: string;
    filters: {
      selectSymbols: string;
      allTypes: string;
      newest: string;
      oldest: string;
    };
    table: {
      date: string;
      coin: string;
      type: string;
      amount: string;
      pricePerCoin: string;
      total: string;
    };
  };
}
