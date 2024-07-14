"use client";

import {
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  RectangleGroupIcon,
  ShoppingCartIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Icons = {
  market: ArrowTrendingUpIcon,
  dashboard: RectangleGroupIcon,
  transactions: WalletIcon,
  trade: ShoppingCartIcon,
  settings: Cog6ToothIcon,
};

type NavItem = { title: string; href: string; icon: keyof typeof Icons }[];

const navItems: NavItem = [
  { title: "Market", href: "/", icon: "market" },
  { title: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { title: "Transactions", href: "/transactions", icon: "transactions" },
  { title: "Trade", href: "/trade", icon: "trade" },
  { title: "Settings", href: "/settings", icon: "settings" },
];

export const Sidebar = () => {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4">
        <Link href="/" className="whitespace-nowrap text-lg font-bold">
          CryptoChimp
        </Link>
        <nav className="mt-8 h-full w-full">
          <ul className="flex min-h-full flex-col items-start space-y-1 px-2">
            {navItems.map(({ title, href, icon }) => {
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
          </ul>
        </nav>
      </div>
    </aside>
  );
};
