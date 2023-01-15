export const formatDate = (date: Date): string => {
  const finnish = new Intl.DateTimeFormat("fi-FI");
  return finnish.format(date);
};

export const formatPrice = (price: number): string => {
  const finnish = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  });
  return finnish.format(price);
};
