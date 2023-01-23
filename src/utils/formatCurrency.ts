export const formatCurrency = (value: number): string =>
  value.toLocaleString("fi-FI", {
    currency: "EUR",
    style: "currency",
  });
