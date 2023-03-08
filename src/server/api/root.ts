import { createTRPCRouter } from "@/server/api/trpc";
import { marketRouter } from "@/server/api/routers/market";
import { transactionRouter } from "@/server/api/routers/transaction";
import { dashboardRouter } from "@/server/api/routers/dashboard";

export const appRouter = createTRPCRouter({
  market: marketRouter,
  transaction: transactionRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
