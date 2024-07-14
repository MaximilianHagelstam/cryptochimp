import { getCurrentUser } from "@/lib/auth";
import { fetchCrypto, getOwnedCoins, getPrice } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { getDashboardMockData, getTopCoinsMockData } from "@/lib/mock";
import { Coin, DashboardData } from "@/types";
import { Transaction, TransactionType } from "@prisma/client";

const IS_PROD = process.env.NODE_ENV === "production";
const INITIAL_CAPITAL = 10_000;

export const getTopCoins = async (limit: number): Promise<Coin[]> => {
  if (!IS_PROD) return getTopCoinsMockData(limit);

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

  return data.map((coin) => ({
    name: coin.name,
    symbol: coin.symbol,
    rank: coin.cmc_rank,
    price: coin.quote.EUR.price,
    percentChange1h: coin.quote.EUR.percent_change_1h,
    percentChange24h: coin.quote.EUR.percent_change_24h,
    percentChange7d: coin.quote.EUR.percent_change_7d,
    marketCap: coin.quote.EUR.market_cap,
  }));
};

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  return await prisma.transaction.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
  });
};

export const getDashboardData = async (
  userId: string
): Promise<DashboardData> => {
  if (!IS_PROD) return getDashboardMockData();

  const { balance } = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });
  const transactions = await prisma.transaction.findMany({
    where: { userId },
  });

  const ownedCoins = await getOwnedCoins(transactions);
  const portfolioValue = ownedCoins.reduce((total, coin) => {
    return total + coin.currentPrice * coin.quantity;
  }, 0);

  const capital = portfolioValue + balance;
  const percentageChange =
    ((capital - INITIAL_CAPITAL) / INITIAL_CAPITAL) * 100;

  const capitalDataPoints = await prisma.capitalDataPoint.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return {
    balance,
    capital: {
      value: capital,
      percentageChange: percentageChange,
    },
    ownedCoins,
    capitalDataPoints,
  };
};

export const createTransaction = async (
  symbol: string,
  quantity: number,
  type: TransactionType
): Promise<Transaction> => {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) throw new Error("Unauthorized");
  const userId = sessionUser.id;

  const pricePerCoin = await getPrice(symbol);
  const total = quantity * pricePerCoin;

  if (type === "BUY") {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    if (user.balance < total) throw new Error("Cannot afford purchase");

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: total,
        },
      },
    });
  }

  if (type === "SELL") {
    const transactionsForCoin = await prisma.transaction.findMany({
      where: {
        userId,
        symbol,
      },
      select: {
        quantity: true,
        type: true,
      },
    });

    const totalCoinsOwned = transactionsForCoin.reduce((total, transaction) => {
      if (transaction.type === "BUY") {
        return total + transaction.quantity;
      }
      return total - transaction.quantity;
    }, 0);

    if (totalCoinsOwned < quantity) throw new Error("Not enough coins to sell");

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: total,
        },
      },
    });
  }

  return await prisma.transaction.create({
    data: {
      type,
      quantity,
      symbol,
      pricePerCoin,
      userId,
    },
  });
};
