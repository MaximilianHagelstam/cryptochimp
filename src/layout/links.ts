type NavLink = {
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { name: "dashboard", href: "/" },
  { name: "wallet", href: "/wallet" },
  { name: "transactions", href: "/transactions" },
  { name: "market", href: "/market" },
  { name: "trade", href: "/trade" },
];
