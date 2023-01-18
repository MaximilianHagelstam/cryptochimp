import { TRPCError } from "@trpc/server";
import { getOwnedCoins } from "../../common/getOwnedCoins";
import { publicProcedure, router } from "../trpc";

export const dashboardRouter = router({
  getIndicatorData: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });

    const { balance } = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    if (transactions.length === 0) return { balance, capital: balance };

    const ownedCoins = await getOwnedCoins(transactions);

    const portfolioValue = ownedCoins.reduce((total, coin) => {
      return total + coin.currentPrice * coin.quantity;
    }, 0);

    const capital = portfolioValue + balance;

    return { balance, capital };
  }),
});
