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
    loading: "Loading...",
  },
  error: {
    error: "Error",
    oops: "Oops!",
    noTransactions: "No transactions yet",
    emptyWallet: "Your wallet is empty",
    investInFirstCoin: "Invest in your first coin",
    here: "here",
    emptyPortfolio: "Your portfolio is empty",
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
    selectSymbols: "Select coins...",
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
    price: "Price",
    totalValue: "Total value",
    name: "Name",
  },
  market: {
    marketCap: "Market cap",
  },
};

export default translations;
