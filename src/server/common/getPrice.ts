import { TRPCError } from "@trpc/server";
import { fetchCrypto } from "@/server/common/fetchCrypto";

export const getPrice = async (symbol: string): Promise<number> => {
  const data = await fetchCrypto<{
    [key: string]: {
      quote: {
        EUR: {
          price: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${symbol}`);

  const price = data[symbol]?.quote.EUR.price;
  if (!price)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Invalid symbol: ${symbol}`,
    });

  return price;
};
