"use client";

import { DBCategoryType, Language } from "../types";
import { categoryText } from "../locales/dictionary";
import { useParams } from "next/navigation";

const CATEGORY_VARIANTS: Record<DBCategoryType, string> = {
  CITY: "bg-light-blue",
  SOCIETY: "bg-emerald-600",
  INCIDENTS: "bg-red",
  ECONOMY: "bg-amber-600",
  CULTURE: "bg-purple-600",
  SPORTS: "bg-blue-600",
  POLITICS: "bg-slate-600",
  SCIENCE: "bg-indigo-600",
};

export function Category({
  category,
  className = "",
}: {
  category: DBCategoryType;
  className?: string;
}) {
  const { lang } = useParams<{ lang: Language }>();
  return (
    <div
      className={`text-white ${CATEGORY_VARIANTS[category]} px-2 py-1 w-fit font-bold ${className}`}
    >
      <p>{categoryText[category] && categoryText[category][lang]}</p>
    </div>
  );
}
