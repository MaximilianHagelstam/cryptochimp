import { getOwnedCoins } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
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

    return NextResponse.json(
      { message: "Success" },
      {
        status: 500,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error" },
      {
        status: 500,
      }
    );
  }
}
