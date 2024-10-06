import { getWallet } from "@/lib/crypto";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const users = await prisma.user.findMany();
    const transactions = await prisma.transaction.findMany();

    const promises = users.map(async (user) => {
      const transactionsForUser = transactions.filter(
        (transaction) => transaction.userId === user.id
      );

      const ownedCoins = await getWallet(transactionsForUser);
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

    await Promise.all(promises);

    return new Response("Success", {
      status: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return new Response("Error", {
      status: 500,
    });
  }
}
