"use client";

import { CategoryType, Language } from "../types";
import { categoryText } from "../locales/dictionary";
import { useParams } from "next/navigation";

const CATEGORY_VARIANTS: Record<CategoryType, string> = {
  City: "bg-light-blue",
  Society: "bg-emerald-600",
  Incidents: "bg-red",
  Economy: "bg-amber-600",
  Culture: "bg-purple-600",
  Sports: "bg-blue-600",
  Politics: "bg-slate-600",
  Science: "bg-indigo-600",
};

export function Category({ category }: { category: CategoryType }) {
  const { lang } = useParams<{ lang: Language }>();
  return (
    <div
      className={`text-white ${CATEGORY_VARIANTS[category]} px-2 py-1 w-fit font-bold`}
    >
      <p>{categoryText[category][lang]}</p>
    </div>
  );
}
