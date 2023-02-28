import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "@/server/api/trpc";
import { fetchCrypto } from "@/server/common/fetchCrypto";

export const marketRouter = createTRPCRouter({
  getAllCoins: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        start: z.number(),
      })
    )
    .query(async ({ input }) => {
      const data = await fetchCrypto<
        {
          name: string;
          symbol: string;
          cmc_rank: number;
          quote: {
            EUR: {
              price: number;
              percent_change_1h: number;
              percent_change_24h: number;
              percent_change_7d: number;
              market_cap: number;
            };
          };
        }[]
      >(`listings/latest?start=${input.start}&limit=${input.limit}`);

      const coins = data.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.cmc_rank,
        price: coin.quote.EUR.price,
        percentChange1h: coin.quote.EUR.percent_change_1h,
        percentChange24h: coin.quote.EUR.percent_change_24h,
        percentChange7d: coin.quote.EUR.percent_change_7d,
        marketCap: coin.quote.EUR.market_cap,
      }));

      return coins;
    }),
});