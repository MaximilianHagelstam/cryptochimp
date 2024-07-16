export const formatCurrency = (value: number) =>
  value.toLocaleString("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

export const getDeltaType = (percentChange: number) => {
  const fixedPercentChange = Number(percentChange.toFixed(1));
  if (fixedPercentChange >= -0.1 && fixedPercentChange <= 0.1)
    return "unchanged";

  return percentChange < 0 ? "moderateDecrease" : "moderateIncrease";
};

export const calculateCoinShare = (coinValue: number, portfolioValue: number) =>
  (coinValue / portfolioValue) * 100;
