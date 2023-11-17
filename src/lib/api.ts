import { fetchCrypto, getOwnedCoins } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { calculateDevelopment } from "@/lib/utils";

export const getTopCoins = async (limit: number) => {
  const data = await fetchCrypto<
    {
      name: string;
      symbol: string;
      cmc_rank: number;
      quote: {
        EUR: {
          price: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
          market_cap: number;
        };
      };
    }[]
  >(`listings/latest?limit=${limit}`);

  const coins = data.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    rank: coin.cmc_rank,
    price: coin.quote.EUR.price,
    percentChange1h: coin.quote.EUR.percent_change_1h,
    percentChange24h: coin.quote.EUR.percent_change_24h,
    percentChange7d: coin.quote.EUR.percent_change_7d,
    marketCap: coin.quote.EUR.market_cap,
  }));

  return coins;
};

export const getTransactions = async (userId: string) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
  });
  return transactions;
};

export const getIndicatorData = async (userId: string) => {
  const { balance } = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
  });

  const ownedCoins = await getOwnedCoins(transactions);
  const portfolioValue = ownedCoins.reduce((total, coin) => {
    return total + coin.currentPrice * coin.quantity;
  }, 0);

  const capital = portfolioValue + balance;
  const { percentage, value } = calculateDevelopment(capital);

  return {
    balance,
    capital,
    development: {
      percentage,
      value,
    },
  };
};

export const getCapitalChartData = async (userId: string) => {
  const capitalDataPoints = await prisma.capitalDataPoint.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const capitalChartData =
    capitalDataPoints.map((dataPoint) => {
      return {
        capital: dataPoint.capital,
        date: Intl.DateTimeFormat("fi-FI", { dateStyle: "short" }).format(
          dataPoint.createdAt
        ),
      };
    }) || [];

  return capitalChartData;
};
