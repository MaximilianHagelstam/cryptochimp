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
