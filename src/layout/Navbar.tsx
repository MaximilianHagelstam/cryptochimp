import { Disclosure, Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { ChevronDown, Menu as MenuIcon, Power, X } from "react-feather";
import { useTranslation } from "../hooks/useTranslation";
import { classNames } from "../utils/classNames";
import { navLinks } from "./links";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Disclosure as="nav" className="sticky top-0 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={32} height={27} />
                  </Link>
                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={classNames(
                          router.pathname === link.href
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-blue-100",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {t.navLinks[link.name as keyof typeof t.navLinks]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex max-w-xs items-center space-x-1 rounded-full p-1 text-gray-500 hover:bg-blue-50 hover:text-blue-600">
                      <Image
                        className="rounded-full"
                        src={session?.user?.image || "/generic-user.png"}
                        alt="User"
                        width={28}
                        height={28}
                      />
                      <ChevronDown size={22} />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 text-sm shadow">
                        <Menu.Item>
                          <div className="px-4 py-2">
                            <span className="block truncate">
                              {session?.user?.name}
                            </span>
                            <span className="block truncate font-medium text-gray-900">
                              {session?.user?.email}
                            </span>
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          <div onClick={() => signOut()} className="px-2 py-1">
                            <div className="group flex items-center rounded-md px-2 py-1 text-red-500 hover:bg-red-50 hover:text-red-600">
                              <Power className="mr-2 h-5 w-5" />
                              {t.common.logout}
                            </div>
                          </div>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2"
                  aria-label="menu"
                >
                  {open ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navLinks.map((link) => (
                <Disclosure.Button
                  as="a"
                  key={link.name}
                  href={link.href}
                  className={classNames(
                    router.pathname === link.href
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-100",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {t.navLinks[link.name as keyof typeof t.navLinks]}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => signOut()}
                className="block rounded-md px-3 py-2 text-base font-medium text-red-500 hover:bg-red-100 hover:text-red-600"
              >
                {t.common.logout}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
