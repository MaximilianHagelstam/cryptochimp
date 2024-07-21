import Link from "next/link";
import { NavLinks } from "./NavLinks";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:block">
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4">
        <Link href="/dashboard" className="whitespace-nowrap text-lg font-bold">
          CryptoChimp
        </Link>
        <nav className="mt-8 h-full w-full">
          <ul className="flex min-h-full flex-col items-start space-y-1 px-2">
            <NavLinks />
          </ul>
        </nav>
      </div>
    </aside>
  );
};
