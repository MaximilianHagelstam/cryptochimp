import { Coin, DashboardData } from "@/types";

export const getTopCoinsMockData = (length: number): Coin[] => {
  return new Array(length).fill(null).map((_, index) => ({
    name: "Bitcoin",
    symbol: "BTC",
    rank: index + 1,
    price: 40_000,
    percentChange1h: 0,
    percentChange24h: -2,
    percentChange7d: 4,
    marketCap: 700_000_000_000,
    metadata: {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      urls: {
        source_code: [],
        reddit: [],
        website: ["https://bitcoin.org/"],
      },
    },
  }));
};

export const getDashboardMockData = (): DashboardData => {
  const currentDate = new Date();
  return {
    balance: 1_000,
    capital: {
      value: 14_000,
      percentageChange: 4,
    },
    capitalToday: {
      value: 500,
      percentageChange: 2,
    },
    ownedCoins: new Array(3).fill({
      name: "Bitcoin",
      symbol: "BTC",
      quantity: 3,
      currentPrice: 30_000,
      percentChange1h: 0,
      percentChange24h: -2,
      percentChange7d: 4,
      totalValue: 90_000,
    }),
    capitalDataPoints: new Array(10)
      .fill(null)
      .map((_, index) => ({
        id: "",
        userId: "",
        capital: Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000,
        createdAt: new Date(currentDate.setDate(currentDate.getDate() - index)),
      }))
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    coinCapitalValue: 13_000,
  };
};
