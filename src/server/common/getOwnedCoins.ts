import type { Transaction } from "@prisma/client";
import type { Coin } from "../../types/Coin";
import { fetchCrypto } from "./fetchCrypto";

export const getOwnedCoins = async (
  transactions: Transaction[]
): Promise<Coin[]> => {
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

  const ownedCoinSymbols = ownedCoins.map((coin) => coin.symbol);
  const data = await fetchCrypto<{
    [key: string]: {
      name: string;
      quote: {
        EUR: {
          price: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${ownedCoinSymbols.join(",")}`);

  const ownedCoinsWithAPIData: Coin[] = ownedCoins.map((coin) => {
    const { symbol, quantity } = coin;
    const currentPrice = data[symbol]?.quote.EUR.price;
    const name = data[symbol]?.name;

    if (!currentPrice || !name) throw new Error("Invalid symbol");

    return {
      symbol,
      quantity,
      currentPrice,
      name,
      totalValue: quantity * currentPrice,
    };
  });

  return ownedCoinsWithAPIData;
};
