import type { Transaction } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { fetchCrypto } from "@/server/common/fetchCrypto";

export const getOwnedCoins = async (transactions: Transaction[]) => {
  if (transactions.length === 0) return [];

  const uniqueSymbols = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  const ownedCoins: { symbol: string; quantity: number }[] = [];

  uniqueSymbols.forEach((symbol) => {
    const symbolTransactions = transactions.filter(
      (transaction) => transaction.symbol === symbol
    );
    const totalQuantity = symbolTransactions.reduce((total, transaction) => {
      if (transaction.type === "BUY") {
        return total + transaction.quantity;
      }
      return total - transaction.quantity;
    }, 0);

    if (totalQuantity > 0) {
      ownedCoins.push({
        symbol,
        quantity: totalQuantity,
      });
    }
  });

  if (ownedCoins.length === 0) return [];

  const ownedCoinSymbols = ownedCoins.map((coin) => coin.symbol).join(",");
  const data = await fetchCrypto<{
    [key: string]: {
      name: string;
      quote: {
        EUR: {
          price: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${ownedCoinSymbols}`);

  const ownedCoinsWithAPIData = ownedCoins.map((coin) => {
    const { symbol, quantity } = coin;
    const currentPrice = data[symbol]?.quote.EUR.price;
    const name = data[symbol]?.name;
    const percentChange1h = data[symbol]?.quote.EUR.percent_change_1h;
    const percentChange24h = data[symbol]?.quote.EUR.percent_change_24h;
    const percentChange7d = data[symbol]?.quote.EUR.percent_change_7d;

    if (!currentPrice || !name || !percentChange24h)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Invalid symbol: ${symbol}`,
      });

    return {
      symbol,
      quantity,
      currentPrice,
      name,
      totalValue: quantity * currentPrice,
      percentChange1h,
      percentChange24h,
      percentChange7d,
    };
  });

  return ownedCoinsWithAPIData;
};
