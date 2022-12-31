import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const transactionRouter = router({
  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["BUY", "SELL"]),
        amount: z.number(),
        symbol: z.string(),
        pricePerCoin: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session?.user) throw new Error("Not logged in");

      return ctx.prisma.transaction.create({
        data: {
          type: input.type,
          amount: input.amount,
          symbol: input.symbol,
          pricePerCoin: input.pricePerCoin,
          userId: ctx.session?.user?.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
});
