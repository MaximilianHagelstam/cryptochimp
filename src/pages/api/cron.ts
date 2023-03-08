import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import { getOwnedCoins } from "@/server/common/getOwnedCoins";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany();
    const transactions = await prisma.transaction.findMany();

    users.map(async (user) => {
      const transactionsForUser = transactions.filter(
        (transaction) => transaction.userId === user.id
      );

      const ownedCoins = await getOwnedCoins(transactionsForUser);
      const portfolioValue = ownedCoins.reduce((total, coin) => {
        return total + coin.currentPrice * coin.quantity;
      }, 0);
      const capital = portfolioValue + user.balance;

      await prisma.capitalDataPoint.create({
        data: {
          capital,
          userId: user.id,
        },
      });
    });

    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(200).json({ message: "Error" });
  }
}
