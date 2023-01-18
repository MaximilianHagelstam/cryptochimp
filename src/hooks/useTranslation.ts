import { useRouter } from "next/router";
import en from "../locales/en";
import sv from "../locales/sv";
import type { Translations } from "../locales/Translations";

export const useTranslation = (): {
  t: Translations;
  changeLanguage: (language: string) => void;
  currentLanguage: string;
} => {
  const router = useRouter();
  const t = router.locale === "en" ? en : sv;

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return { t, changeLanguage, currentLanguage: router.locale || "en" };
};
