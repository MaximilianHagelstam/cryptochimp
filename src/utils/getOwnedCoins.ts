import type { Transaction } from "@prisma/client";

type OwnedCoin = {
  symbol: string;
  amount: number;
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
    const totalAmount = symbolTransactions.reduce((total, transaction) => {
      if (transaction.type === "BUY") {
        return total + transaction.amount;
      }
      return total - transaction.amount;
    }, 0);

    if (totalAmount > 0) {
      ownedCoins.push({
        symbol,
        amount: totalAmount,
      });
    }
  });

  return ownedCoins;
};
