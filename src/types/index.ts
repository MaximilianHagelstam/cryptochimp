import { CapitalDataPoint } from "@prisma/client";

export type OwnedCoin = {
  name: string;
  symbol: string;
  quantity: number;
  currentPrice: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  totalValue: number;
};

export type Coin = {
  name: string;
  symbol: string;
  rank: number;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
};

export type DashboardData = {
  balance: number;
  capital: {
    value: number;
    percentageChange: number;
  };
  capitalToday: {
    value: number;
    percentageChange: number;
  };
  ownedCoins: OwnedCoin[];
  capitalDataPoints: CapitalDataPoint[];
  coinCapitalValue: number;
};
