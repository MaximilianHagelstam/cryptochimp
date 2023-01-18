import { fetchCrypto } from "./fetchCrypto";

export const getMultiplePrices = async (
  symbols: string[]
): Promise<
  {
    symbol: string;
    price: number;
  }[]
> => {
  const data = await fetchCrypto<{
    [key: string]: {
      quote: {
        EUR: {
          price: number;
        };
      };
    };
  }>(`quotes/latest?symbol=${symbols.join(",")}`);

  const prices = symbols.map((symbol) => {
    const price = data[symbol]?.quote.EUR.price;
    if (!price) throw new Error("Invalid symbol");
    return { symbol, price };
  });

  return prices;
};
