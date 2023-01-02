interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Dashboard", href: "/" },
  { name: "Wallet", href: "/wallet" },
  { name: "Transactions", href: "/transactions" },
  { name: "Market", href: "/market" },
  { name: "Trade", href: "/trade" },
];
