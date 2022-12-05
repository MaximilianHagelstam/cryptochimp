import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const { changeLanguage } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav>
      <button
        className="m-2 bg-gray-400 p-2"
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      >
        {currentTheme === "dark" ? "light" : "dark"}
      </button>
      <button
        className="m-2 bg-gray-400 p-2"
        onClick={() => changeLanguage("en")}
      >
        en
      </button>
      <button
        className="m-2 bg-gray-400 p-2"
        onClick={() => changeLanguage("sv")}
      >
        sv
      </button>
    </nav>
  );
};

export default Navbar;
