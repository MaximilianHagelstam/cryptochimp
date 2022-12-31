import { type NextPage } from "next";
import { useTranslation } from "../hooks/useTranslation";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return <h1>{t.title}</h1>;
};

export default Home;
