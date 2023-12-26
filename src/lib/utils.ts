export const formatCurrency = (value: number) =>
  `${Intl.NumberFormat("fi-FI").format(value).toString()} €`;

export const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

export const getDeltaType = (percentChange: number) => {
  const fixedPercentChange = Number(percentChange.toFixed(1));
  if (fixedPercentChange >= -0.1 && fixedPercentChange <= 0.1)
    return "unchanged";

  return percentChange < 0 ? "moderateDecrease" : "moderateIncrease";
};
