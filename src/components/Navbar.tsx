import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center justify-start">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <UserMenu user={user} />
        </nav>
      </div>
    </header>
  );
};
