export const formatDate = (date: Date): string => {
  const finnish = new Intl.DateTimeFormat("fi-FI");
  return finnish.format(date);
};
