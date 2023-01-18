import { TRPCError } from "@trpc/server";
import { calculateDevelopment } from "../../../utils/calculateDevelopment";
import { getOwnedCoins } from "../../common/getOwnedCoins";
import { publicProcedure, router } from "../trpc";

export const walletRouter = router({
  getWalletData: publicProcedure.query(async ({ ctx }) => {
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

    if (transactions.length === 0)
      return {
        balance,
        capital: balance,
        development: {
          percentage: "0%",
          value: 0,
        },
        wallet: [],
      };

    const wallet = await getOwnedCoins(transactions);
    const portfolioValue = wallet.reduce((total, coin) => {
      return total + coin.currentPrice * coin.quantity;
    }, 0);

    const capital = portfolioValue + balance;
    const { percentage, value } = calculateDevelopment(capital);

    return {
      balance,
      capital,
      development: {
        percentage,
        value,
      },
      wallet,
    };
  }),
});
