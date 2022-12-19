import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Menu as MenuIcon,
  X,
  ChevronDown,
  User,
  BarChart2,
  Power,
} from "react-feather";
import { signIn, signOut, useSession } from "next-auth/react";

import { navLinks } from "./links";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Disclosure as="nav" className="bg-slate-400">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <Image src="/logo.svg" alt="Logo" height={32} width={32} />
                  </Link>
                </div>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="px-3 py-2 text-sm font-medium text-slate-100 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {session?.user ? (
                    <Menu as="div" className="relative ml-3">
                      <Menu.Button className="flex max-w-xs items-center space-x-2 rounded-xl py-2">
                        <Image
                          className="rounded-full"
                          src={session.user.image || ""}
                          alt="User"
                          width={24}
                          height={24}
                        />
                        <ChevronDown size={24} className="text-slate-100" />
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
                        <Menu.Items className="absolute right-0 z-10 mx-2 mt-2 w-48 origin-top-right rounded-md border border-slate-200 bg-slate-400 p-2 shadow-lg">
                          <Menu.Item>
                            <Link
                              href="/settings"
                              className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-slate-100 hover:bg-slate-300 hover:text-white"
                            >
                              <User className="mr-2 h-5 w-5" />
                              Account Settings
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              href="/random"
                              className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-slate-100 hover:bg-slate-300 hover:text-white"
                            >
                              <BarChart2 className="mr-2 h-5 w-5" />
                              Random Thing
                            </Link>
                          </Menu.Item>
                          <div className="m-2 border-t border-slate-200" />
                          <Menu.Item>
                            <Link
                              href="/random"
                              onClick={() => signOut()}
                              className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-200 hover:bg-slate-300 hover:text-red-100"
                            >
                              <Power className="mr-2 h-5 w-5" />
                              Logout
                            </Link>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button
                      onClick={() => signIn()}
                      className="rounded-lg bg-purple-200 px-4 py-2 text-sm font-medium hover:bg-purple-100"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-300">
                  {open ? (
                    <X className="block" />
                  ) : (
                    <MenuIcon className="block" />
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
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-slate-300"
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

export default Navbar;
