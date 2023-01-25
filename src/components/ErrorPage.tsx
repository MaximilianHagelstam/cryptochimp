import { signOut } from "next-auth/react";
import { useTranslation } from "../hooks/useTranslation";

type ErrorPageProps = {
  message: string;
};

const ErrorPage = ({ message }: ErrorPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">{t.error.oops}</p>
      <p className="mb-8 text-lg">{message}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={() => {
          signOut();
        }}
      >
        {t.common.logout}
      </button>
    </div>
  );
};

export default ErrorPage;
