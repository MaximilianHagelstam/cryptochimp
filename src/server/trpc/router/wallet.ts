import type { Coin } from "../../../types/Coin";
import { protectedProcedure, router } from "../trpc";
import { getOwnedCoins } from "../../common/getOwnedCoins";
import { calculateDevelopment } from "../../../utils/calculateDevelopment";

export const walletRouter = router({
  getWalletData: protectedProcedure.query(
    async ({
      ctx,
    }): Promise<{
      balance: number;
      capital: number;
      development: {
        percentage: string;
        value: number;
      };
      ownedCoins: Coin[];
    }> => {
      const userId = ctx.session.user.id;

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

      const ownedCoins = await getOwnedCoins(transactions);
      const portfolioValue = ownedCoins.reduce((total, coin) => {
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
        ownedCoins,
      };
    }
  ),
});
