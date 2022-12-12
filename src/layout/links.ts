interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Explore", href: "/explore" },
  { name: "Trade", href: "/trade" },
  { name: "Feed", href: "/feed" },
  { name: "Rank", href: "/rank" },
];
