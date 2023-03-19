import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment } from "react";

const Avatar = () => {
  const { data: session } = useSession();

  if (!session?.user)
    return (
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    );

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex max-w-xs items-center space-x-1 rounded-full p-1 text-slate-500 hover:bg-blue-50 hover:text-blue-600">
        {session.user.image ? (
          <Image
            className="h-7 w-7 rounded-full"
            src={session?.user?.image || "/generic-user.png"}
            alt="User"
            width={28}
            height={28}
          />
        ) : (
          <div className="flex h-7 w-7 animate-pulse rounded-full bg-slate-200" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-slate-100 rounded-md bg-white py-1 text-sm shadow">
          <Menu.Item>
            <div className="px-4 py-2">
              <span className="block truncate">{session.user.name}</span>
              <span className="block truncate font-medium">
                {session.user.email}
              </span>
            </div>
          </Menu.Item>
          <Menu.Item>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="w-full py-1 px-2"
            >
              <div className="group flex items-center rounded-md px-2 py-1 text-red-500 hover:bg-red-50 hover:text-red-600">
                <PowerIcon className="mr-2 h-5 w-5" />
                Logout
              </div>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Avatar;
