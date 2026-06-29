"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Language } from "@/src/types";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLanguageChange = (newLang: Language) => {
    if (!pathname) return;

    const segments = pathname.split("/");

    segments[1] = newLang;

    const newPathname = segments.join("/");

    const currentQueryString = searchParams.toString();

    const finalUrl = currentQueryString
      ? `${newPathname}?${currentQueryString}`
      : newPathname;

    window.location.href = finalUrl;
  };

  const currentLang = (pathname?.split("/")[1] || "ru") as Language;

  return (
    <select
      value={currentLang}
      onChange={(e) => handleLanguageChange(e.target.value as Language)}
      className="text-deep-blue"
    >
      <option value="kk">Қазақша</option>
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
}
