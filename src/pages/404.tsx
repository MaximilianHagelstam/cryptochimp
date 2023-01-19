import type { NextPage } from "next";
import ErrorPage from "../components/ErrorPage";
import { useTranslation } from "../hooks/useTranslation";

const NotFound: NextPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorPage
      title={t.error.notFound.title}
      description={t.error.notFound.description}
      isNotFound
    />
  );
};

export default NotFound;
