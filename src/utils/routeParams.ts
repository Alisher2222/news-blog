import { notFound } from "next/navigation";
import type { CategoryType, Language } from "@/src/types";

const languages = ["ru", "kk", "en"] satisfies Language[];
const categories = [
  "CITY",
  "SOCIETY",
  "INCIDENTS",
  "ECONOMY",
  "CULTURE",
  "SPORTS",
  "POLITICS",
  "SCIENCE",
  "ALL",
] satisfies CategoryType[];

export function getRouteLanguage(value: string): Language {
  if (languages.includes(value as Language)) {
    return value as Language;
  }

  notFound();
}

export function getRouteCategory(value: string): CategoryType {
  if (categories.includes(value as CategoryType)) {
    return value as CategoryType;
  }

  notFound();
}
