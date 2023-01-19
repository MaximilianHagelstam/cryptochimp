import type { Translations } from "./Translations";

const translations: Translations = {
  common: {
    logout: "Logout",
    buy: "Buy",
    sell: "Sell",
    coin: "Coin",
    symbol: "Symbol",
    type: "Type",
    quantity: "Quantity",
  },
  error: {
    error: "Error",
    oops: "Oops!",
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      goHome: "Go Home",
    },
  },
  navigation: {
    wallet: "Wallet",
    transactions: "Transactions",
    market: "Market",
    trade: "Trade",
  },
  transactions: {
    noTransactions: "No transactions",
    selectSymbols: "Select symbols...",
    allTypes: "All types",
    date: "Date",
    pricePerCoin: "Price/coin",
    total: "Total",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
  },
  trade: {
    confirmOrder: "Confirm order",
    cancel: "Cancel",
  },
  wallet: {
    balance: "Balance",
    capital: "Capital",
    development: "Development • Max",
    portfolio: "Portfolio",
    noCoins: "No coins",
  },
};

export default translations;
