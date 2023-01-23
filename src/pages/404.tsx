import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";

const NotFound: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">{t.error.notFound.title}</p>
      <p className="mb-8 text-lg">{t.error.notFound.description}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={() => {
          router.push("/");
        }}
      >
        {t.error.notFound.goHome}
      </button>
    </div>
  );
};

export default NotFound;
