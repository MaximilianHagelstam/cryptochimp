interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Holdings", href: "/holdings" },
  { name: "Transactions", href: "/transactions" },
  { name: "Market", href: "/market" },
  { name: "Trade", href: "/trade" },
];
