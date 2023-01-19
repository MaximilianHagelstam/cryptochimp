import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../hooks/useTranslation";

type ErrorPageProps = {
  code: number | undefined;
  message: string;
};

const ErrorPage = ({ code = 500, message }: ErrorPageProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">{code}</p>
      <p className="mb-8 text-lg">{message}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={async () => {
          if (code === 404) {
            await router.push("/");
          } else {
            await signOut();
          }
        }}
      >
        {code === 404 ? t.error.notFound.goHome : t.common.logout}
      </button>
    </div>
  );
};

export default ErrorPage;
