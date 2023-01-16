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
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        // cursor is a reference to the last item in the previous batch
        // it's used to fetch the next batch
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, skip, cursor } = input;

      const transactions = await ctx.prisma.transaction.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId: ctx.session?.user?.id,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (transactions.length > limit) {
        const nextItem = transactions.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }

      return {
        transactions,
        nextCursor,
      };
    }),
});
