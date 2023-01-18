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
        quantity: z.number(),
        symbol: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { type, quantity, symbol } = input;
      const userId = ctx.session?.user?.id;

      if (!userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      if (quantity <= 0)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Quantity must be greater than 0",
        });

      const pricePerCoin = await getPrice(symbol);
      if (!pricePerCoin)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid symbol: ${symbol}`,
        });

      const total = quantity * pricePerCoin;

      if (type === "BUY") {
        const user = await ctx.prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
          },
        });

        if (user.balance < total)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not enough balance",
          });

        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: {
              decrement: total,
            },
          },
        });
      }

      if (type === "SELL") {
        const transactionsForCoin = await ctx.prisma.transaction.findMany({
          where: {
            userId,
            symbol,
          },
          select: {
            quantity: true,
            type: true,
          },
        });

        const totalCoinsOwned = transactionsForCoin.reduce((acc, curr) => {
          if (curr.type === "BUY") {
            return acc + curr.quantity;
          }
          return acc - curr.quantity;
        }, 0);

        if (totalCoinsOwned < quantity)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not enough coins",
          });

        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: {
              increment: total,
            },
          },
        });
      }

      return ctx.prisma.transaction.create({
        data: {
          type,
          quantity,
          symbol,
          pricePerCoin,
          userId,
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
        totalTransactionsQuantity: transactions.length,
      };
    }),
});
