import { router } from "../trpc";
import { authRouter } from "./auth";
import { transactionRouter } from "./transaction";

export const appRouter = router({
  transaction: transactionRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
