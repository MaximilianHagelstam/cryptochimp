import { TRPCError } from "@trpc/server";
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

    return { balance };
  }),
});
