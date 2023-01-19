import type { Translations } from "./Translations";

const translations: Translations = {
  common: {
    logout: "Logga ut",
    buy: "Köp",
    sell: "Sälj",
    coin: "Valuta",
    symbol: "Symbol",
    type: "Typ",
    quantity: "Antal",
  },
  error: {
    error: "Fel",
    oops: "Hoppsan!",
    notFound: {
      title: "Sidan hittades inte",
      description: "Sidan du letar efter finns inte.",
      goHome: "Gå Hem",
    },
  },
  navigation: {
    wallet: "Plånbok",
    transactions: "Transaktioner",
    market: "Marknad",
    trade: "Handla",
  },
  transactions: {
    noTransactions: "Inga transaktioner",
    selectSymbols: "Välj symboler...",
    allTypes: "Alla typer",
    date: "Datum",
    pricePerCoin: "Pris/valuta",
    total: "Summa",
    previous: "Föregående",
    next: "Nästa",
    page: "Sida",
    of: "av",
  },
  trade: {
    confirmOrder: "Bekräfta beställning",
    cancel: "Avbryt",
  },
  wallet: {
    balance: "Saldo",
    capital: "Kapital",
    development: "Utveckling • Max",
    portfolio: "Portfölj",
  },
};

export default translations;
