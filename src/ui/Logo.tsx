"use client";

import { Language } from "@/src/types";
import Link from "next/link";
import { FaRegNewspaper } from "react-icons/fa";
import { logoText } from "@/src/locales/dictionary";
import { useParams } from "next/navigation";

const VARIANTS = {
  dark: { bg: "bg-deep-blue", icon: "text-white", heading: "text-deep-blue" },
  light: {
    bg: "bg-light-blue",
    icon: "text-white",
    heading: "text-white",
  },
};

export function Logo({
  cityName,
  language,
  variant,
}: {
  cityName: string;
  language: Language;
  variant: keyof typeof VARIANTS;
}) {
  const { lang } = useParams();
  return (
    <Link href={`/${lang}`} className="flex gap-5">
      <div
        className={`hidden ${VARIANTS[variant].bg} w-15 h-15 rounded-2xl sm:flex justify-center items-center`}
      >
        <FaRegNewspaper className={`w-7 h-7 ${VARIANTS[variant].icon}`} />
      </div>
      <div>
        <h1
          className={`uppercase ${VARIANTS[variant].heading} font-extrabold text-2xl`}
        >
          {cityName} <span className="text-red">News</span>
        </h1>
        <p className="text-gray-text tracking-widest">{logoText[language]}</p>
      </div>
    </Link>
  );
}
