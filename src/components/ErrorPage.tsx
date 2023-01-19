import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslation } from "../hooks/useTranslation";

type ErrorPageProps = {
  title: string;
  description: string;
  isNotFound?: boolean;
};

const ErrorPage = ({
  title,
  description,
  isNotFound = false,
}: ErrorPageProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-3xl font-bold">{title}</p>
      <p className="mb-8 text-lg">{description}</p>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        onClick={async () => {
          if (isNotFound) {
            await router.push("/");
          } else {
            await signOut();
          }
        }}
      >
        {isNotFound ? t.error.notFound.goHome : t.common.logout}
      </button>
    </div>
  );
};

export default ErrorPage;
