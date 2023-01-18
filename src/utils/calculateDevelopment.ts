export const calculateDevelopment = (
  capital: number
): {
  developmentValue: number;
  developmentPercentage: string;
} => {
  const INITIAL_CAPITAL = 10_000;

  const developmentPercentage = (
    ((capital - INITIAL_CAPITAL) / INITIAL_CAPITAL) *
    100
  ).toFixed(2);

  const developmentValue = capital - INITIAL_CAPITAL;
  const formattedDevelopmentPercentage = `${
    developmentValue > 0 ? "+" : ""
  }${developmentPercentage}%`;

  return {
    developmentValue,
    developmentPercentage: formattedDevelopmentPercentage,
  };
};
