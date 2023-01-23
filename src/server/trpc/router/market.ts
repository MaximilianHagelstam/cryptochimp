import { protectedProcedure, router } from "../trpc";

export const marketRouter = router({
  getMarketData: protectedProcedure.query(() => {
    return {
      name: "James",
    };
  }),
});
