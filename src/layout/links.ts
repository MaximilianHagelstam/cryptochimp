type NavLink = {
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { name: "wallet", href: "/" },
  { name: "transactions", href: "/transactions" },
  { name: "market", href: "/market" },
  { name: "trade", href: "/trade" },
];
