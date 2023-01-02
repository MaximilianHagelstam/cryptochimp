import { fetchCrypto } from "./fetchCrypto";

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
  if (!price) throw new Error(`Could not get price for symbol: ${symbol}`);

  return price;
};
