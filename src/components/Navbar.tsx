"use client";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars2Icon,
  ChevronDownIcon,
  PowerIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Skeleton } from "./Skeleton";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Market", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  { name: "Trade", href: "/trade" },
];

interface NavbarProps {
  isAuthed: boolean;
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  userImage: string | null | undefined;
}

export const Navbar = ({
  isAuthed,
  userEmail,
  userImage,
  userName,
}: NavbarProps) => {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                  </Link>
                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                          pathname === link.href
                            ? "bg-blue-100 text-gray-950 dark:bg-blue-950 dark:text-gray-50"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800",
                          "rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden flex-row space-x-4 md:flex">
                <ThemeToggle />
                <div className="flex items-center">
                  {isAuthed ? (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex max-w-xs items-center space-x-1 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                        {userImage ? (
                          <Image
                            className="h-7 w-7 rounded-full"
                            src={userImage}
                            alt="User"
                            width={28}
                            height={28}
                          />
                        ) : (
                          <Skeleton className="h-7 w-7 rounded-full" />
                        )}
                        <ChevronDownIcon className="h-5 w-5" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-slate-100 rounded-md bg-white py-1 text-sm shadow dark:divide-gray-800 dark:border dark:border-gray-800 dark:bg-gray-900">
                          <Menu.Item>
                            <div className="px-4 py-2">
                              <span className="block truncate">{userName}</span>
                              <span className="block truncate font-medium">
                                {userEmail}
                              </span>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              onClick={() => {
                                signOut();
                              }}
                              className="w-full px-2 py-1"
                            >
                              <div className="group flex items-center rounded-md bg-opacity-80 px-2 py-1 text-red-500 hover:bg-red-500/10">
                                <PowerIcon className="mr-2 h-5 w-5" />
                                Logout
                              </div>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button
                      className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                      onClick={() => {
                        signIn();
                      }}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2"
                  aria-label="menu"
                >
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars2Icon className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navLinks.map((link) => (
                <Disclosure.Button
                  as="a"
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    pathname === link.href
                      ? "bg-blue-100 text-gray-950 dark:bg-blue-950 dark:text-gray-50"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200"
                  )}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
