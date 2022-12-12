import { useTranslation } from "../hooks/useTranslation";

const Navbar = () => {
  const { changeLanguage } = useTranslation();

  return (
    <nav>
      <button className="m-2 bg-white p-2" onClick={() => changeLanguage("en")}>
        en
      </button>
      <button className="m-2 bg-white p-2" onClick={() => changeLanguage("sv")}>
        sv
      </button>
    </nav>
  );
};

export default Navbar;
