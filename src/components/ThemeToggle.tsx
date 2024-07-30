"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <MoonIcon
        className={clsx(theme === "light" ? "block" : "hidden", "size-5")}
      />
      <SunIcon
        className={clsx(theme === "dark" ? "block" : "hidden", "size-5")}
      />
    </button>
  );
};
