import { TRPCError } from "@trpc/server";
import { getOwnedCoins } from "../../../utils/getOwnedCoins";
import { getMultiplePrices } from "../../common/getMultiplePrices";
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

    const ownedCoins = getOwnedCoins(transactions);
    const ownedSymbols = ownedCoins.map((coin) => coin.symbol);
    const prices = await getMultiplePrices(ownedSymbols);

    const totalValue = prices.reduce((acc, curr) => {
      const ownedCoin = ownedCoins.find((coin) => coin.symbol === curr.symbol);
      if (!ownedCoin) return acc;

      return acc + ownedCoin.quantity * curr.price;
    }, 0);

    const capital = totalValue + balance;

    return { balance, capital };
  }),
});
