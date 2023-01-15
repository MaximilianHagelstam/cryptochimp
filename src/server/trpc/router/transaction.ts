import { z } from "zod";
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
      if (!ctx.session?.user) throw new Error("Not logged in");
      if (input.amount <= 0) throw new Error("Amount must be greater than 0");

      const pricePerCoin = await getPrice(input.symbol);

      return ctx.prisma.transaction.create({
        data: {
          type: input.type,
          amount: input.amount,
          symbol: input.symbol,
          pricePerCoin,
          userId: ctx.session?.user?.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
