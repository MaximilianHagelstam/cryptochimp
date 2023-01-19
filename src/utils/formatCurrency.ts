export const formatCurrency = (
  value: number,
  significantDigits = 5
): string => {
  const finnish = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumSignificantDigits: significantDigits,
    maximumSignificantDigits: significantDigits,
  });
  return finnish.format(value);
};
