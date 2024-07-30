import { SignInButton } from "@/components/SigninButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";
import { getStarCount } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const GITHUB_REPO_LINK = "https://github.com/MaximilianHagelstam/cryptochimp";
const GITHUB_PROFILE_LINK = "https://github.com/MaximilianHagelstam";

export default async function Landing() {
  const starCount = await getStarCount();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-5xl flex-col items-center gap-8 text-center">
            <Link
              href={GITHUB_REPO_LINK}
              className="rounded-2xl bg-tremor-brand/20 px-4 py-1.5 text-sm font-medium"
              target="_blank"
            >
              {`${starCount} stars on GitHub`}
            </Link>
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Mock cryptocurrency trading platform
            </h1>
            <p className="max-w-2xl leading-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-8">
              Start with a balance of 10 000 € and learn as you buy, sell, and
              manage digital assets. Master the market and elevate your trading
              expertise.
            </p>
            <div className="mt-2 space-x-4">
              <LinkButton
                href="/dashboard"
                className="bg-tremor-brand text-gray-50 hover:bg-blue-500/90 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-100/90"
              >
                Get started
              </LinkButton>
              <LinkButton
                href={GITHUB_REPO_LINK}
                className="border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
                newTab
              >
                GitHub
              </LinkButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-950">
      <div className="container flex h-14 items-center">
        <div className="flex gap-4">
          <Link href="/" className="flex items-center justify-start">
            <Image src="/text-logo.png" alt="Logo" width={193} height={32} />
          </Link>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          {user ? <UserMenu user={user} /> : <SignInButton size="sm" />}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={GITHUB_PROFILE_LINK}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Maximilian Hagelstam
            </a>
            . The source code is available on{" "}
            <a
              href={GITHUB_REPO_LINK}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
};

const LinkButton = ({
  children,
  href,
  className,
  newTab = false,
}: {
  children: ReactNode;
  href: string;
  className: string;
  newTab?: boolean;
}) => {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : "_self"}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-lg px-8 text-base font-medium",
        className
      )}
    >
      {children}
    </Link>
  );
};
