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
    loading: "Laddar...",
  },
  error: {
    error: "Fel",
    oops: "Hoppsan!",
    noTransactions: "Inga transaktioner ännu",
    emptyWallet: "Din plånbok är tom",
    emptyPortfolio: "Din portfölj är tom",
    investInFirstCoin: "Investera i din första valuta",
    here: "här",
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
    selectSymbols: "Välj valutor...",
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
    price: "Pris",
    totalValue: "Totalt värde",
    name: "Namn",
  },
  market: {
    marketCap: "Marknadsvärde",
  },
};

export default translations;
