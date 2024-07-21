"use client";

import {
  ArrowPathRoundedSquareIcon,
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  RectangleGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Icons = {
  market: ArrowTrendingUpIcon,
  dashboard: RectangleGroupIcon,
  transactions: ArrowPathRoundedSquareIcon,
  trade: ShoppingCartIcon,
  settings: Cog6ToothIcon,
};

type NavLink = { title: string; href: string; icon: keyof typeof Icons }[];

const navLinks: NavLink = [
  { title: "Dashboard", href: "/dashboard", icon: "dashboard" },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: "transactions",
  },
  { title: "Market", href: "/dashboard/market", icon: "market" },
  { title: "Trade", href: "/dashboard/trade", icon: "trade" },
  { title: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export const NavLinks = () => {
  const path = usePathname();

  return (
    <>
      {navLinks.map(({ title, href, icon }) => {
        const Icon = Icons[icon];
        return (
          <Link
            key={title}
            href={href}
            className={clsx(
              path === href
                ? "bg-blue-100 text-gray-950 dark:bg-blue-950 dark:text-gray-50"
                : "hover:bg-gray-100 dark:hover:bg-gray-800",
              "flex w-full flex-row items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            )}
          >
            <Icon className="h-5 w-5" />
            <p>{title}</p>
          </Link>
        );
      })}
    </>
  );
};
