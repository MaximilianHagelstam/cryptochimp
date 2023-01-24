import type { MarketCoin } from "../../../types/MarketCoin";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { fetchCrypto } from "../../common/fetchCrypto";

export const marketRouter = router({
  getMarketData: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        start: z.number(),
      })
    )
    .query(async ({ input }): Promise<MarketCoin[]> => {
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

      const marketData: MarketCoin[] = data.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        rank: coin.cmc_rank,
        price: coin.quote.EUR.price,
        percentChange1h: coin.quote.EUR.percent_change_1h,
        percentChange24h: coin.quote.EUR.percent_change_24h,
        percentChange7d: coin.quote.EUR.percent_change_7d,
        marketCap: coin.quote.EUR.market_cap,
      }));

      return marketData;
    }),
});
