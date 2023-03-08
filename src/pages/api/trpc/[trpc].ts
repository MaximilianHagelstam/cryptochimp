import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
