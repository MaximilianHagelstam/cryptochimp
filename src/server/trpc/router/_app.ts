import { router } from "../trpc";
import { authRouter } from "./auth";
import { dashboardRouter } from "./dashboard";
import { transactionRouter } from "./transaction";

export const appRouter = router({
  transaction: transactionRouter,
  auth: authRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
