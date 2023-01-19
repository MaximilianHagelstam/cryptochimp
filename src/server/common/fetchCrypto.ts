import { TRPCError } from "@trpc/server";
import axios from "axios";
import { env } from "../../env/server.mjs";

export const fetchCrypto = async <T>(url: string): Promise<T> => {
  const { status, data } = await axios.get<{ data: T }>(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/${url}&convert=EUR`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": env.CMC_API_KEY,
        Accept: "application/json",
      },
    }
  );

  if (status !== 200)
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "CoinMarketCap rate limited us. Please try again later",
    });

  return data.data;
};
