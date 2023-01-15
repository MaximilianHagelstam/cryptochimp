export const formatDate = (date: Date): string =>
  `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

export const formatPrice = (price: number): string => {
  const finnish = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
  });
  return finnish.format(price);
};
