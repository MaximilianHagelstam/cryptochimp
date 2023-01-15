import { Button } from "@tremor/react";
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
      <Button
        size="md"
        importance="primary"
        text={t.error.notFound.goHome}
        onClick={() => router.push("/")}
      />
    </div>
  );
};

export default NotFound;
