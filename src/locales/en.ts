import type Translations from "./Translations";

const translations: Translations = {
  common: {
    logout: "Logout",
    buy: "Buy",
    sell: "Sell",
  },
  error: {
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      goHome: "Go Home",
    },
  },
  navLinks: {
    dashboard: "Dashboard",
    wallet: "Wallet",
    transactions: "Transactions",
    market: "Market",
    trade: "Trade",
  },
  transactions: {
    noTransactions: "No transactions",
    filters: {
      selectSymbols: "Select symbols...",
      allTypes: "All types",
      newest: "Newest",
      oldest: "Oldest",
    },
    table: {
      date: "Date",
      coin: "Coin",
      type: "Type",
      amount: "Amount",
      pricePerCoin: "Price/coin",
      total: "Total",
    },
  },
};

export default translations;
