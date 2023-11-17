export const calculateDevelopment = (
  capital: number
): {
  value: number;
  percentage: string;
} => {
  const INITIAL_CAPITAL = 10_000;

  if (capital === INITIAL_CAPITAL) return { value: 0, percentage: "0%" };

  const value = capital - INITIAL_CAPITAL;

  const percentage = (
    ((capital - INITIAL_CAPITAL) / INITIAL_CAPITAL) *
    100
  ).toFixed(2);
  const formattedPercentage = `${value > 0 ? "+" : ""}${percentage}%`;

  return {
    value,
    percentage: formattedPercentage,
  };
};

export const formatCurrency = (value: number) =>
  `${Intl.NumberFormat("fi-FI").format(value).toString()} €`;

export const getDeltaType = (percentChange: number) => {
  const fixedPercentChange = Number(percentChange.toFixed(2));
  if (fixedPercentChange >= -0.01 && fixedPercentChange <= 0.01)
    return "unchanged";

  return percentChange < 0 ? "moderateDecrease" : "moderateIncrease";
};
