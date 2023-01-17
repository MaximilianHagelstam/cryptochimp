import { fetchCrypto } from "./fetchCrypto";

export const getPrice = async (symbol: string): Promise<number | null> => {
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
  if (!price) return null;

  return price;
};
