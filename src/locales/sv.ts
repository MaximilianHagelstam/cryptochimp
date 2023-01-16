import type Translations from "./Translations";

const translations: Translations = {
  common: {
    logout: "Logga ut",
    buy: "Köp",
    sell: "Sälj",
    previous: "Föregående",
    next: "Nästa",
  },
  error: {
    notFound: {
      title: "Sidan hittades inte",
      description: "Sidan du letar efter finns inte.",
      goHome: "Gå Hem",
    },
  },
  navLinks: {
    dashboard: "Översikt",
    wallet: "Plånbok",
    transactions: "Transaktioner",
    market: "Marknad",
    trade: "Handla",
  },
  transactions: {
    noTransactions: "Inga transaktioner",
    filters: {
      selectSymbols: "Välj symboler...",
      allTypes: "Alla typer",
      newest: "Nyaste",
      oldest: "Äldsta",
    },
    table: {
      date: "Datum",
      coin: "Valuta",
      type: "Typ",
      amount: "Antal",
      pricePerCoin: "Pris/valuta",
      total: "Summa",
    },
  },
};

export default translations;
