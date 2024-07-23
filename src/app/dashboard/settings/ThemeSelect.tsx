"use client";

import { Select, SelectItem } from "@tremor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Select
      value={mounted ? theme : ""}
      onChange={(e) => {
        const newTheme = e as unknown as string;
        setTheme(newTheme);
      }}
    >
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
    </Select>
  );
};
