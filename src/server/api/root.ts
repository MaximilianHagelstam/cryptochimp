import { createTRPCRouter } from "@/server/api/trpc";
import { marketRouter } from "@/server/api/routers/market";
import { transactionRouter } from "@/server/api/routers/transaction";
import { walletRouter } from "@/server/api/routers/wallet";

export const appRouter = createTRPCRouter({
  market: marketRouter,
  transaction: transactionRouter,
  wallet: walletRouter,
});

export type AppRouter = typeof appRouter;
