"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { NavLinks } from "./NavLinks";

export const MobileNav = () => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden">
        {({ active }) => (
          <>
            <XMarkIcon className={clsx(active ? "block h-6 w-6" : "hidden")} />
            <Bars2Icon className={clsx(active ? "hidden" : "block h-6 w-6")} />
          </>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right space-y-1 rounded-md bg-white px-2 pb-3 pt-2 shadow dark:bg-gray-900 sm:px-3"
      >
        <NavLinks />
      </MenuItems>
    </Menu>
  );
};
