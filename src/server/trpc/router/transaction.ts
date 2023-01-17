import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { splitArray } from "../../../utils/splitArray";
import { getPrice } from "../../common/getPrice";
import { publicProcedure, router } from "../trpc";

export const transactionRouter = router({
  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["BUY", "SELL"]),
        amount: z.number(),
        symbol: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { type, amount, symbol } = input;

      if (!ctx.session?.user) throw new Error("Not logged in");
      if (amount <= 0) throw new Error("Amount must be greater than 0");

      const pricePerCoin = await getPrice(input.symbol);
      if (!pricePerCoin)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid symbol: ${symbol}`,
        });

      return ctx.prisma.transaction.create({
        data: {
          type,
          amount,
          symbol,
          pricePerCoin,
          userId: ctx.session?.user?.id,
        },
      });
    }),
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const transactions = await ctx.prisma.transaction.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: ctx.session?.user?.id,
        },
      });

      const pagedTransactions = splitArray(transactions, input.limit);

      return {
        pagedTransactions,
        totalTransactionsAmount: transactions.length,
      };
    }),
});
