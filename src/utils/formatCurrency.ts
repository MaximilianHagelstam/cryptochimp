export const formatCurrency = (value: number) =>
  `${Intl.NumberFormat("fi-FI").format(value).toString()} €`;
