import { router } from "../trpc";
import { authRouter } from "./auth";
import { walletRouter } from "./wallet";
import { transactionRouter } from "./transaction";
import { marketRouter } from "./market";

export const appRouter = router({
  transaction: transactionRouter,
  auth: authRouter,
  wallet: walletRouter,
  market: marketRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
