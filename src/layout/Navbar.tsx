import Image from "next/image";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { Menu, X, ChevronDown } from "react-feather";
import { signIn, useSession } from "next-auth/react";

import { navLinks } from "./links";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Disclosure as="nav" className="bg-purple-900">
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
                        className="px-3 py-2 text-sm font-medium text-gray-100 hover:text-white"
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
                    <div className="relative ml-3">
                      <div className="flex max-w-xs items-center space-x-2 rounded-xl py-2 hover:cursor-pointer">
                        <Image
                          className="rounded-full"
                          src={session.user.image || ""}
                          alt="User"
                          width={24}
                          height={24}
                        />
                        <ChevronDown size={24} className="text-gray-100" />
                      </div>
                    </div>
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
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-purple-800">
                  {open ? <X className="block" /> : <Menu className="block" />}
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
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-purple-800"
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
