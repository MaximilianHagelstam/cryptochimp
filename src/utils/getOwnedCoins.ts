import type { Transaction } from "@prisma/client";

type OwnedCoin = {
  symbol: string;
  quantity: number;
};

export const getOwnedCoins = (transactions: Transaction[]): OwnedCoin[] => {
  const uniqueSymbols = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  const ownedCoins: OwnedCoin[] = [];

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

  return ownedCoins;
};
