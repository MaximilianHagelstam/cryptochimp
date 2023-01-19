import type { Coin } from "../../types/Coin";
import type { Transaction } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { fetchCrypto } from "./fetchCrypto";

export const getOwnedCoins = async (
  transactions: Transaction[]
): Promise<Coin[]> => {
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

  const ownedCoinSymbols = ownedCoins.map((coin) => coin.symbol);
  const data = await fetchCrypto<{
    [key: string]: {
      name: string;
      quote: {
        EUR: {
          price: number;
          percent_change_24h: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${ownedCoinSymbols.join(",")}`);

  const ownedCoinsWithAPIData: Coin[] = ownedCoins.map((coin) => {
    const { symbol, quantity } = coin;
    const currentPrice = data[symbol]?.quote.EUR.price;
    const name = data[symbol]?.name;
    const percentChange24h = data[symbol]?.quote.EUR.percent_change_24h;

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
      percentChange24h,
    };
  });

  return ownedCoinsWithAPIData;
};
